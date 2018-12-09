import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseViewerComponent } from './course-viewer/course-viewer.component';
import { LessonDetailComponent } from './course-viewer/lesson-detail/lesson-detail.component';
import { AuthGuard } from '../core/auth-guard.service';
import { LessonsGuard } from './lessons.guard';

const routes: Routes = [
  {
    path: '',
    component: CourseViewerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: ':sectionId/lesson/:lessonId',
            component: LessonDetailComponent,
            canActivate: [LessonsGuard]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseViewerRoutingModule { }
