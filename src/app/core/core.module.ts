import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { CourseDataService } from './course-data.service';
import { XapiService } from './xapi/xapi.service';
import { IntersectionObserverService } from './intersection-observer/intersection-observer.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ApiService, CourseDataService, XapiService, IntersectionObserverService]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
