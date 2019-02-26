import { Injectable } from '@angular/core';
import { FirebaseApiService } from './firebase-api.service';
import { Observable, forkJoin, Subject, of, from } from 'rxjs';
import { AuthService } from './auth.service';
import { CourseProgress, UserProgress } from './progress.model';
import { switchMap, take, map, toArray } from 'rxjs/operators';
import { CourseDataService } from './course-data.service';
import { LessonData } from '../course-viewer/lesson.model';
import { InteractiveChunkAnswer } from '../chunks/interactive-chunk-answer.model';

@Injectable()
export class ProgressService {

  private interactiveChunkAnsweredSource = new Subject<boolean>();

  public totalLessons$ = 1;
  public progress$ = '0';

  public courseComplete = false;

  interactiveChunkAnswered$ = this.interactiveChunkAnsweredSource.asObservable();

  answerInteractiveChunk(answered: boolean) {
    this.interactiveChunkAnsweredSource.next(answered);
  }


  constructor(
    private fbsApi: FirebaseApiService,
    private authService: AuthService,
    private courseDataStore: CourseDataService
  ) { }

  get progress(): Observable<CourseProgress> {
    return this.authService.uid.pipe(
      switchMap(uid => {
        return this.fbsApi.getUserProgress(uid);
      }),
      take(1)
    );
  }

  public createUserProgress() {
    const initialProgress: CourseProgress = this.createDefaultCourseProgress();

    forkJoin(this.authService.uid, this.authService.name).subscribe(
      ([uid, name]) => {
        const userProgress: UserProgress = {
          name: name.split(' ')[0],
          uid: uid,
          progress: initialProgress
        };
        this.fbsApi.createUserProgress(userProgress);
      },
      err => console.log('Error accediendo a los datos del usuario')
    );
  }

  private createDefaultCourseProgress(): CourseProgress {
    const defaultFirstLessonId = 's01l01';

    return {
      courseId: this.courseDataStore.courseId,
      unlockedLessons: [defaultFirstLessonId],
      currentLesson: {
        isFinished: false,
        lessonId: 'l01',
        sectionId: 's01'
      }
    };
  }

  public updateProgress(currentLessonId: string, currentSectionId: string, nextLesson: LessonData) {

    forkJoin([this.authService.uid, this.progress]).subscribe(
      ([uid, progress]) => {
        if (progress.currentLesson.lessonId === currentLessonId && progress.currentLesson.sectionId === currentSectionId) {
          // Se desbloquea la lección desde la que se le da al botón siguiente para poder seguir accediendo a ella
          // en el futuro
          this.fbsApi.unlockLesson(uid, nextLesson.sectionId, nextLesson.id);

          this.fbsApi.updateUserCurrentLesson(uid, nextLesson.id, nextLesson.sectionId);
        }
      }
    );
  }

  /**
   * Comprueba si un Chunk interactivo ha sido creado y/o respondido, si es así devuelve las respuestas, si no
   * crea un objeto vacío
   *
   * Todas las respuestas de un curso se almacenan en una misma colección para que su acceso sea instantaneo
   */
  public checkAnswered(chunkId: string): Observable<InteractiveChunkAnswer> {
    return this.fbsApi.checkAnswered(this.authService.userId, chunkId);
  }

  public setAnswer(chunkId: string, choice: any) {
    this.fbsApi.setAnswer(this.authService.userId, chunkId, choice);
  }

  public checkUnlockedLesson(completeLessonId: string): Observable<boolean> {
    return this.fbsApi.getUnlockedLessons(this.authService.userId)
      .pipe(
        map(
          unlockedLessons => {
            return unlockedLessons.indexOf(completeLessonId) !== -1 ? true : false;
          }
        )
      );
  }

  public getUnlockedLessons(): Observable<string[]> {
    return this.fbsApi.getUnlockedLessons(this.authService.userId);
  }

  /**
   * Objetivo:
   * 1. Obtener todos los Chunks interactivos con sus respuestas
   * 2. Filtrar los Chunks que estén en mi chunks array
   * 3. Comprobar si estos Chunks tienen respuesta y devolver false si no es así
   * 4. Devolver true si no existe ningún Chunk interactivo
   */
  public checkLessonCompletion(sectionId: string, lessonId: string, chunks: any[]): Observable<boolean> {
    const completeChunkIds = chunks.map(chunk => sectionId + lessonId + chunk.id);

    return this.fbsApi.getAnsweredChunks(this.authService.userId)
      .pipe(
        map(
          answeredChunks => {
            const interactiveLessonChunks = answeredChunks.filter(answeredChunk => {
              return completeChunkIds.some(id => answeredChunk.id === id);
            });
            if (interactiveLessonChunks.every(chunk => chunk.data !== '')) {
              this.fbsApi.completeCurrentLesson(this.authService.userId);
              return true;
            } else {
              this.fbsApi.uncompleteCurrentLesson(this.authService.userId);
              return false;
            }
          }
        )
      );
  }

  updateCourseProgress(isComplete: boolean) {
    this.fbsApi.getUserProgress(this.authService.userId)
      .subscribe(
        progress => {
          let completedLessons = 0;

          if (isComplete) {
            completedLessons = progress.unlockedLessons.length;
          } else {
            completedLessons = progress.unlockedLessons.length - 1;
          }

          this.progress$ = ((completedLessons / this.totalLessons$) * 100).toFixed();
          if (this.progress$ === '100') {
            this.courseComplete = true;
          } else {
            this.courseComplete = false;
          }
        }
      );
  }
}
