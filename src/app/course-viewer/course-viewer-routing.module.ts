import { Routes, RouterModule } from '@angular/router';
import { CourseViewerComponent } from './course-viewer.component';
import { NgModule } from '@angular/core';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { CourseNavComponent } from './course-nav/course-nav.component';
import { CourseViewerHomeComponent } from './course-viewer-home/course-viewer-home.component';

/**
 * Routing específico para los componentes del Container CourseViewer
 */

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
        RouterModule.forChild(courseViewerRoutes) // <-- No incluye el Router Service
    ],
    exports: [
        RouterModule
    ]
})
export class CourseViewerRoutingModule {}
