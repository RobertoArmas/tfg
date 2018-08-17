import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDataService } from './course-data.service';
import { XapiService } from './xapi/xapi.service';
import { IntersectionObserverService } from './intersection-observer/intersection-observer.service';
import { FirebaseApiService } from './firebase-api.service';
import { AuthGuard } from './auth-guard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [CourseDataService, XapiService, IntersectionObserverService, FirebaseApiService, AuthGuard]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
