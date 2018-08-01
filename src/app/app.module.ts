import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';

// tslint:disable-next-line:max-line-length
import { MatSidenavModule, MatCheckboxModule, MatToolbarModule, MatButtonModule, MatCardModule, MatTabsModule, MatListModule, MatProgressBarModule, MatExpansionModule, MatIconModule, MatProgressSpinnerModule, MatRadioModule } from '@angular/material';

import { AppComponent } from './app.component';
import { PageHeaderComponent } from './common/page-header/page-header.component';
import { ChunkTextComponent } from './common/text/chunk-text/chunk-text.component';
import { ChunkHeadingComponent } from './common/text/chunk-heading/chunk-heading.component';
import { ChunkSubheadingComponent } from './common/text/chunk-subheading/chunk-subheading.component';
import { ChunkHeadingTextComponent } from './common/text/chunk-heading-text/chunk-heading-text.component';
import { ChunkSubheadingTextComponent } from './common/text/chunk-subheading-text/chunk-subheading-text.component';
import { ChunkTwoColumnComponent } from './common/text/chunk-two-column/chunk-two-column.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { CourseDataService } from './course-viewer/course-data.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { CourseViewerComponent } from './course-viewer/course-viewer.component';
import { AppRoutingModule } from './app-routing.module';
import { CourseViewerRoutingModule } from './course-viewer/course-viewer-routing.module';
import { LessonDetailComponent } from './course-viewer/lesson-detail/lesson-detail.component';
import { CourseNavComponent } from './course-viewer/course-nav/course-nav.component';
import { CourseViewerHomeComponent } from './course-viewer/course-viewer-home/course-viewer-home.component';
import { ChunkDirective } from './course-viewer/lesson-detail/chunk-directive.directive';
import { ChunkCheckboxListComponent } from './common/interactive/chunk-checkbox-list/chunk-checkbox-list.component';
import { XapiService } from './xapi.service';
import { IntersectionObserverService } from './common/intersection-observer.service';
import { MultipleChoiceComponent } from './common/test/multiple-choice/multiple-choice.component';
/**
 * GUÍA MUY COMPLETA SOBRE ANGULAR 2 (SERVICIOS, COMPONENTES, ETC.)
 * https://www.sitepoint.com/angular-2-tutorial/
 */

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    ChunkTextComponent,
    CourseNavComponent,
    ChunkHeadingComponent,
    ChunkSubheadingComponent,
    ChunkHeadingTextComponent,
    ChunkSubheadingTextComponent,
    ChunkTwoColumnComponent,
    WelcomeComponent,
    CourseViewerComponent,
    LessonDetailComponent,
    CourseViewerHomeComponent,
    ChunkDirective,
    ChunkCheckboxListComponent,
    MultipleChoiceComponent,
  ],
  imports: [
    CourseViewerRoutingModule,
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
    MatRadioModule,
    AppRoutingModule
  ],
  entryComponents: [  // <-- Hay que declarar los componentes que se van a generar dinámicamente https://angular.io/guide/entry-components
    ChunkHeadingComponent,
    ChunkSubheadingComponent,
    ChunkTextComponent,
    ChunkTwoColumnComponent,
    ChunkHeadingTextComponent,
    ChunkSubheadingTextComponent,
    ChunkCheckboxListComponent,
    MultipleChoiceComponent
  ],
  providers: [ ApiService, CourseDataService, XapiService, IntersectionObserverService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
