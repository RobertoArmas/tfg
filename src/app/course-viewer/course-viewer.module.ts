import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';

import { CourseViewerRoutingModule } from './course-viewer-routing.module';
import { CourseViewerComponent } from './course-viewer/course-viewer.component';
import { CourseNavComponent } from './course-viewer/course-nav/course-nav.component';
import { LessonDetailComponent } from './course-viewer/lesson-detail/lesson-detail.component';
import { ChunkDirective } from './course-viewer/lesson-detail/chunk.directive';
import { LessonHeaderComponent } from './course-viewer/lesson-detail/lesson-header/lesson-header.component';

@NgModule({
  imports: [
    CommonModule,
    CourseViewerRoutingModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [CourseViewerComponent, CourseNavComponent, LessonDetailComponent, ChunkDirective, LessonHeaderComponent]
})
export class CourseViewerModule { }
