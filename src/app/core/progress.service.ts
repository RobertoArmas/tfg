import { Injectable } from '@angular/core';
import { FirebaseApiService } from './firebase-api.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CourseProgress } from './progress.model';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ProgressService {
  constructor(
    private fbsApi: FirebaseApiService,
    private authService: AuthService
    ) { }

  get progress(): Observable<CourseProgress> {
    return this.authService.uid.pipe(
      switchMap(uid => {
        return this.fbsApi.getUserProgress(uid);
      })
    );
  }
}
