import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CourseData } from '../course-viewer/course.model';
import { SectionData } from '../course-viewer/section.model';
import { LessonData, Lesson } from '../course-viewer/lesson.model';
import { ChunkData } from '../chunks/chunk.model';
import { CourseProgress } from './progress.model';

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
}
