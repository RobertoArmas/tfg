import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChunkTextComponent } from './common/text/chunk-text/chunk-text.component';
import { ChunkHeadingComponent } from './common/text/chunk-heading/chunk-heading.component';
import { ChunkSubheadingComponent } from './common/text/chunk-subheading/chunk-subheading.component';
import { ChunkHeadingTextComponent } from './common/text/chunk-heading-text/chunk-heading-text.component';
import { ChunkSubheadingTextComponent } from './common/text/chunk-subheading-text/chunk-subheading-text.component';
import { ChunkTwoColumnComponent } from './common/text/chunk-two-column/chunk-two-column.component';
import { ChunkCheckboxListComponent } from './common/interactive/chunk-checkbox-list/chunk-checkbox-list.component';
import { ChunkImageCenteredComponent } from './common/image/chunk-image-centered/chunk-image-centered.component';
import { MaterialModule } from './material.module';
import { MultipleChoiceComponent } from './common/activity/multiple-choice/multiple-choice.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
/**
 * GUÍA MUY COMPLETA SOBRE ANGULAR 2 (SERVICIOS, COMPONENTES, ETC.)
 * https://www.sitepoint.com/angular-2-tutorial/
 */

/**
 * https://medium.com/dailyjs/angular-and-accessibility-8ae1f601803a
 */

 /**
  * Cambio de css a scss:
  * https://stackoverflow.com/questions/36220256/angular-cli-sass-options
  */

@NgModule({
  declarations: [
    AppComponent,
    ChunkTextComponent,
    ChunkHeadingComponent,
    ChunkSubheadingComponent,
    ChunkHeadingTextComponent,
    ChunkSubheadingTextComponent,
    ChunkTwoColumnComponent,
    ChunkCheckboxListComponent,
    MultipleChoiceComponent,
    ChunkImageCenteredComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule,
    CoreModule
  ],
  entryComponents: [  // <-- Hay que declarar los componentes que se van a generar dinámicamente https://angular.io/guide/entry-components
    ChunkHeadingComponent,
    ChunkSubheadingComponent,
    ChunkTextComponent,
    ChunkTwoColumnComponent,
    ChunkHeadingTextComponent,
    ChunkSubheadingTextComponent,
    ChunkCheckboxListComponent,
    MultipleChoiceComponent,
    ChunkImageCenteredComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
