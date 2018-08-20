import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { ChunkHeadingComponent } from './text/chunk-heading/chunk-heading.component';
import { MaterialModule } from '../material.module';
import { ChunkHeadingTextComponent } from './text/chunk-heading-text/chunk-heading-text.component';
import { ChunkSubheadingComponent } from './text/chunk-subheading/chunk-subheading.component';
import { ChunkSubheadingTextComponent } from './text/chunk-subheading-text/chunk-subheading-text.component';
import { ChunkTextComponent } from './text/chunk-text/chunk-text.component';
import { ChunkTwoColumnComponent } from './text/chunk-two-column/chunk-two-column.component';
import { ChunkCheckboxListComponent } from './interactive/chunk-checkbox-list/chunk-checkbox-list.component';
import { ChunkImageCenteredComponent } from './image/chunk-image-centered/chunk-image-centered.component';
import { ChunkMultipleChoiceComponent } from './activity/chunk-multiple-choice/chunk-multiple-choice.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    ChunkHeadingComponent,
    ChunkHeadingTextComponent,
    ChunkSubheadingComponent,
    ChunkSubheadingTextComponent,
    ChunkTextComponent,
    ChunkTwoColumnComponent,
    ChunkCheckboxListComponent,
    ChunkImageCenteredComponent,
    ChunkMultipleChoiceComponent
  ],
  exports: [
    ChunkHeadingComponent,
    ChunkHeadingTextComponent,
    ChunkSubheadingComponent,
    ChunkSubheadingTextComponent,
    ChunkTextComponent,
    ChunkTwoColumnComponent,
    ChunkTwoColumnComponent,
    ChunkCheckboxListComponent,
    ChunkImageCenteredComponent,
    ChunkMultipleChoiceComponent
  ],
  entryComponents: [ // <-- Hay que declarar los componentes que se van a generar dinámicamente https://angular.io/guide/entry-components
    ChunkHeadingComponent,
    ChunkHeadingTextComponent,
    ChunkSubheadingComponent,
    ChunkSubheadingTextComponent,
    ChunkTextComponent,
    ChunkTwoColumnComponent,
    ChunkTwoColumnComponent,
    ChunkCheckboxListComponent,
    ChunkImageCenteredComponent,
    ChunkMultipleChoiceComponent
  ]
})
export class ChunksModule { }