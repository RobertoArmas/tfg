import { Injectable } from '@angular/core';
import { FirebaseApiService } from './firebase-api.service';
import { Observable, forkJoin } from 'rxjs';
import { AuthService } from './auth.service';
import { CourseProgress, UserProgress } from './progress.model';
import { switchMap, take, flatMap, concat, timeout } from 'rxjs/operators';
import { CourseDataService } from './course-data.service';
import { LessonData } from '../course-viewer/lesson.model';

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
    let initialProgress: CourseProgress = this.createInitialCourseProgress();

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

  private createInitialCourseProgress(): CourseProgress {
    return {
      courseId: this.courseDataStore.courseId,
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
          this.fbsApi.updateUserCurrentLesson(uid, nextLesson.id, nextLesson.sectionId);
        }
      }
    );
  }
}
