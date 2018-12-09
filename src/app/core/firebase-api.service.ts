import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, from, zip, combineLatest, forkJoin } from 'rxjs';
import { map, flatMap, switchMap, mergeMap, tap, toArray, combineAll, merge, concat, pairwise, concatAll, mergeAll, concatMap } from 'rxjs/operators';

import { CourseData } from '../course-viewer/course.model';
import { SectionData } from '../course-viewer/section.model';
import { LessonData, Lesson } from '../course-viewer/lesson.model';
import { ChunkData } from '../chunks/chunk.model';
import { CourseProgress, UserProgress, currentLessonProgress } from './progress.model';
import { InteractiveChunkAnswer } from '../chunks/interactive-chunk-answer.model';


import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseApiService {
  currentCourse: string;

  constructor(private afs: AngularFirestore) { }

  getCourseInformation(id: string): Observable<CourseData> {
    this.currentCourse = id;

    return this.afs
      .collection('courses').doc<CourseData>(id)
      .valueChanges();
  }

  getCourseSections(courseId: string): Observable<SectionData[]> {
    return this.afs
      .collection('courses').doc(courseId)
      .collection<SectionData>('sections')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const data = action.payload.doc.data() as SectionData;
          const id = action.payload.doc.id;
          return { id, ...data };
        })));
  }

  getSectionLessons(courseId: string, sectionId: string): Observable<LessonData[]> {
    return this.afs
      .collection('courses').doc(courseId)
      .collection('sections').doc(sectionId)
      .collection<LessonData>('lessons')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const data = action.payload.doc.data() as LessonData;
          const id = action.payload.doc.id;
          return { id, ...data };
        })));
  }

  getLessonInformation(courseId: string, sectionId: string, lessonId: string): Observable<LessonData> {
    return this.afs
      .collection('courses').doc(courseId)
      .collection('sections').doc(sectionId)
      .collection('lessons').doc<LessonData>(lessonId)
      .valueChanges();
  }

  getLessonChunks(courseId: string, sectionId: string, lessonId: string): Observable<ChunkData[]> {
    return this.afs
      .collection('courses').doc(courseId)
      .collection('sections').doc(sectionId)
      .collection('lessons').doc(lessonId)
      .collection('chunks')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const data = action.payload.doc.data() as ChunkData;
          const id = action.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  getUserProgress(uid: string): Observable<CourseProgress> {
    return this.afs.collection('users').doc(uid)
          .collection<CourseProgress>('courses', ref => ref.where('courseId', '==', this.currentCourse))
          .valueChanges()
          .pipe(
            map(
              progress => progress[0]
            )
          );
  }

  createUserProgress(user: UserProgress) {

    // Primero se identifica la id del documento que se va a crear junto con la sub-collection 'courses'
    let newUserProgressRef =  this.afs.firestore.collection('users').doc(user.uid);

    // Crea un documento con una sub-collection que tiene el curso y el progreso correspondiente
    newUserProgressRef.set({uid: user.uid, name: user.name}).then(
      () => {
        newUserProgressRef.collection('courses').doc(user.progress.courseId).set(user.progress)
      }
    );
  }

  updateUserCurrentLesson(uid: string, id: string, sectionId: string) {
    let newCurrentLesson: currentLessonProgress = {
      isFinished: false,
      lessonId: id,
      sectionId: sectionId
    }

    this.afs.collection('users').doc(uid).collection('courses').doc(this.currentCourse).update(
      { "currentLesson": newCurrentLesson }
    );
  }

  checkAnswered(uid: string, chunkId: string): Observable<InteractiveChunkAnswer> {
    return this.afs.collection('users').doc(uid)
      .collection('courses').doc(this.currentCourse)
      .collection('answeredChunks').doc<InteractiveChunkAnswer>(chunkId)
      .valueChanges();
  }

  setAnswer(uid: string, chunkId: string, choice: string) {
    this.afs.collection('users').doc(uid)
      .collection('courses').doc(this.currentCourse)
      .collection('answeredChunks').doc(chunkId)
      .set({
        answer: choice
      });
  }

  getLessonsArray(): Observable<any> {
    let sections = this.getCourseSections(this.currentCourse);

    /**
     * No borrar este código porque obtiene los objetos sección con los objetos lección dentro
     */
    // return sections.pipe(
    //   switchMap(sections => from(sections)),
    //   mergeMap(section => this.getSectionLessons(this.currentCourse, section.id)
    //     .pipe(
    //       map(lessons => (
    //         {section, lessons}
    //         ))
    //     )),
    //   tap(data => data.section.lessons = data.lessons),
    //   map(data => data.section)
    // )

    return sections.pipe(
      switchMap(sections => from(sections)),
      flatMap(section => this.getSectionLessons(this.currentCourse, section.id)
        .pipe(
          switchMap(lessons => from(lessons)),
          map(lesson => (section.id + lesson.id)
        ))))
  }

  unlockLesson(uid: string, completeLessonId: string) {
    this.afs.collection('users').doc(uid)
      .collection('courses').doc(this.currentCourse)
      .update({
        unlockedLessons: firebase.firestore.FieldValue.arrayUnion(completeLessonId)
      })
  }

  getUnlockedLessons(uid: string): Observable<string[]> {
    return this.afs.collection('users').doc(uid)
      .collection('courses').doc<CourseProgress>(this.currentCourse)
      .valueChanges()
      .pipe(
        map(course => {
          return course.unlockedLessons;
        })
      );
  }
}
