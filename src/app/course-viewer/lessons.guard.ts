import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProgressService } from '../core/progress.service';

@Injectable({
  providedIn: 'root'
})
export class LessonsGuard implements CanActivate {
  constructor(private progressStore: ProgressService) 
  {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let completeLessonId: string = next.params['sectionId'] + next.params['lessonId'];
    return this.progressStore.checkUnlockedLesson(completeLessonId);
  }
}
