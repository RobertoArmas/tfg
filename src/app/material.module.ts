import { NgModule } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { MatSidenavModule, MatCheckboxModule, MatToolbarModule, MatButtonModule, MatCardModule, MatTabsModule, MatListModule, MatProgressBarModule, MatExpansionModule, MatIconModule, MatProgressSpinnerModule, MatRadioModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
