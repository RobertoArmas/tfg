import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PresentationViewerComponent } from './presentation-viewer/presentation-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    PresentationViewerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
