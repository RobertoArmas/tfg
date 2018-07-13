import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { MatSidenavModule, MatCheckboxModule, MatToolbarModule, MatButtonModule, MatCardModule, MatTabsModule, MatListModule, MatProgressBarModule, MatExpansionModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ReviewTabsComponent } from './common/interactive/review-tabs/review-tabs.component';
import { PageHeaderComponent } from './common/page-header/page-header.component';
import { ChunkTextComponent } from './common/text/chunk-text/chunk-text.component';
import { CourseNavComponent } from './common/course-nav/course-nav.component';
import { ChunkHeadingComponent } from './common/text/chunk-heading/chunk-heading.component';
import { ChunkSubheadingComponent } from './common/text/chunk-subheading/chunk-subheading.component';
import { ChunkHeadingTextComponent } from './common/text/chunk-heading-text/chunk-heading-text.component';
import { ChunkSubheadingTextComponent } from './common/text/chunk-subheading-text/chunk-subheading-text.component';
import { ChunkTwoColumnComponent } from './common/text/chunk-two-column/chunk-two-column.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { CourseDataService } from './course-data.service';


/**GUÍA MUY COMPLETA SOBRE ANGULAR 2 (SERVICIOS, COMPONENTES, ETC.)
 * https://www.sitepoint.com/angular-2-tutorial/
*/

const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ReviewTabsComponent,
    PageHeaderComponent,
    ChunkTextComponent,
    CourseNavComponent,
    ChunkHeadingComponent,
    ChunkSubheadingComponent,
    ChunkHeadingTextComponent,
    ChunkSubheadingTextComponent,
    ChunkTwoColumnComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging
    )
  ],
  providers: [ ApiService, CourseDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }


/**
 * TODO: Hay que mirar implementar un BackendService que se encargue de obtener
 * los datos, después el course service lo que va a hacer es coger todo el objeto
 * y extraer un objeto en el que solo estén el título del curso, los títulos de las
 * secciones y los títulos de las lecciones.
 *
 * Después
 */
