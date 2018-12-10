import { Injectable } from '@angular/core';
import { FirebaseApiService } from './firebase-api.service';
import { Observable, forkJoin } from 'rxjs';
import { AuthService } from './auth.service';
import { CourseProgress, UserProgress } from './progress.model';
import { switchMap, take, filter, map } from 'rxjs/operators';
import { CourseDataService } from './course-data.service';
import { LessonData } from '../course-viewer/lesson.model';
import { InteractiveChunkAnswer } from '../chunks/interactive-chunk-answer.model';

@Injectable()
export class ProgressService {
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
    let initialProgress: CourseProgress = this.createDefaultCourseProgress();

    forkJoin(this.authService.uid, this.authService.name).subscribe(
      ([uid, name]) => {
        let userProgress: UserProgress = {
                name: name.split(" ")[0],
                uid: uid,
                progress: initialProgress
              }
      
              this.fbsApi.createUserProgress(userProgress);
      },
      err => console.log("Error accediendo a los datos del usuario")
    );
  }

  private createDefaultCourseProgress(): CourseProgress {
    let defaultFirstLessonId = 's1l1';

    return {
      courseId: this.courseDataStore.courseId,
      unlockedLessons: [defaultFirstLessonId],
      currentLesson: {
        isFinished: false,
        lessonId: 'l1',
        sectionId: 's1'
      }
    }
  }

  public updateProgress(currentLessonId: string, currentSectionId: string, nextLesson: LessonData) {

    forkJoin([this.authService.uid, this.progress]).subscribe(
      ([uid, progress]) => {
        if(progress.currentLesson.lessonId === currentLessonId && progress.currentLesson.sectionId === currentSectionId) {
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
          return unlockedLessons.indexOf(completeLessonId) != -1 ? true : false;
        }
      )
    );
  }

  public getUnlockedLessons(): Observable<string[]> {
    return this.fbsApi.getUnlockedLessons(this.authService.userId);
  }
}
