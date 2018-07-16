import { Routes, RouterModule } from '../../../node_modules/@angular/router';
import { CourseViewerComponent } from './course-viewer.component';
import { NgModule } from '../../../node_modules/@angular/core';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { CourseNavComponent } from './course-nav/course-nav.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseViewerHomeComponent } from './course-viewer-home/course-viewer-home.component';

const courseViewerRoutes: Routes = [
    {
        path: 'course',
        component: CourseViewerComponent,
        children: [
            {
                path: '',
                component: CourseNavComponent,
                outlet: 'sidenav'
            },
            {
                path: ':id',
                component: LessonDetailComponent
            },
            {
                path: '',
                component: CourseViewerHomeComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(courseViewerRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CourseViewerRoutingModule {}