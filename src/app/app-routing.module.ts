import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Rutas de la aplicación a nivel global
 */

const appRoutes: Routes = [
    { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomeModule' },
    { path: 'course-viewer/section', loadChildren: './course-viewer/course-viewer.module#CourseViewerModule' },
    // { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    // { path: '**', redirectTo: '/welcome' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false, // <-- debugging purposes only
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
