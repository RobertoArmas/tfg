import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatSidenavModule, MatCheckboxModule, MatToolbarModule, MatButtonModule, MatCardModule, MatTabsModule } from '@angular/material';

import { AppComponent } from './app.component';
import { TitleComponent } from './common/text/title/title.component';
import { SubtitleComponent } from './common/text/subtitle/subtitle.component';
import { TitleTextComponent } from './common/text/title-text/title-text.component';
import { ReviewTabsComponent } from './common/interactive/review-tabs/review-tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    SubtitleComponent,
    TitleTextComponent,
    ReviewTabsComponent,
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
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
