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
import { ChunkService } from './chunk.service';
import { ContentLoaderModule } from '@netbasal/ngx-content-loader';
import { ChunkVideoComponent } from './video/chunk-video/chunk-video.component';
import { ChunkImageFullComponent } from './image/chunk-image-full/chunk-image-full.component';
import { ChunkNumberedListComponent } from './list/chunk-numbered-list/chunk-numbered-list.component';
import { ChunkMultipleAnswersComponent } from './activity/chunk-multiple-answers/chunk-multiple-answers.component';
import { ChunkBulletedListComponent } from './list/chunk-bulleted-list/chunk-bulleted-list.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ContentLoaderModule
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
    ChunkMultipleChoiceComponent,
    ChunkVideoComponent,
    ChunkImageFullComponent,
    ChunkNumberedListComponent,
    ChunkBulletedListComponent,
    ChunkMultipleAnswersComponent
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
    ChunkMultipleChoiceComponent,
    ChunkNumberedListComponent,
    ChunkBulletedListComponent,
    ChunkMultipleAnswersComponent
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
    ChunkMultipleChoiceComponent,
    ChunkVideoComponent,
    ChunkImageFullComponent,
    ChunkNumberedListComponent,
    ChunkBulletedListComponent,
    ChunkMultipleAnswersComponent
  ],
  providers: [ChunkService]
})
export class ChunksModule { }
