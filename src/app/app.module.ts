import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
// tslint:disable-next-line:max-line-length
import { MatSidenavModule, MatCheckboxModule, MatToolbarModule, MatButtonModule, MatCardModule, MatTabsModule, MatListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { TitleComponent } from './common/text/title/title.component';
import { SubtitleComponent } from './common/text/subtitle/subtitle.component';
import { TitleTextComponent } from './common/text/title-text/title-text.component';
import { ReviewTabsComponent } from './common/interactive/review-tabs/review-tabs.component';
import { PageHeaderComponent } from './common/page-header/page-header.component';
import { ChunkTextComponent } from './common/text/chunk-text/chunk-text.component';
import { CourseNavComponent } from './common/course-nav/course-nav.component';

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
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
