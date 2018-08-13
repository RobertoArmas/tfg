import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { FlexLayoutModule } from '../../../node_modules/@angular/flex-layout';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [WelcomePageComponent]
})
export class WelcomeModule { }
