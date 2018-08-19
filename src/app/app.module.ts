import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ChunksModule } from './chunks/chunks.module';
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
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    ChunksModule,
    FlexLayoutModule,
    MaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
