import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
// tslint:disable-next-line:max-line-length
import { MatSidenavModule, MatCheckboxModule, MatToolbarModule, MatButtonModule, MatCardModule, MatTabsModule, MatListModule, MatProgressBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { TitleComponent } from './common/text/title/title.component';
import { SubtitleComponent } from './common/text/subtitle/subtitle.component';
import { TitleTextComponent } from './common/text/title-text/title-text.component';
import { ReviewTabsComponent } from './common/interactive/review-tabs/review-tabs.component';
import { PageHeaderComponent } from './common/page-header/page-header.component';
import { ChunkTextComponent } from './common/text/chunk-text/chunk-text.component';
import { CourseNavComponent } from './common/course-nav/course-nav.component';
import { ChunkHeadingComponent } from './common/text/chunk-heading/chunk-heading.component';
import { ChunkSubheadingComponent } from './common/text/chunk-subheading/chunk-subheading.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    SubtitleComponent,
    TitleTextComponent,
    ReviewTabsComponent,
    PageHeaderComponent,
    ChunkTextComponent,
    CourseNavComponent,
    ChunkHeadingComponent,
    ChunkSubheadingComponent,
  ],
  imports: [
    BrowserModule,
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
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
