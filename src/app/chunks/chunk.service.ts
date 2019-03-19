import { Injectable } from '@angular/core';
import { Chunk } from './chunk.model';
import { ChunkHeadingComponent } from './text/chunk-heading/chunk-heading.component';
import { ChunkSubheadingComponent } from './text/chunk-subheading/chunk-subheading.component';
import { ChunkTextComponent } from './text/chunk-text/chunk-text.component';
import { ChunkTwoColumnComponent } from './text/chunk-two-column/chunk-two-column.component';
import { ChunkHeadingTextComponent } from './text/chunk-heading-text/chunk-heading-text.component';
import { ChunkSubheadingTextComponent } from './text/chunk-subheading-text/chunk-subheading-text.component';
import { ChunkCheckboxListComponent } from './interactive/chunk-checkbox-list/chunk-checkbox-list.component';
import { ChunkMultipleChoiceComponent } from './activity/chunk-multiple-choice/chunk-multiple-choice.component';
import { ChunkImageCenteredComponent } from './image/chunk-image-centered/chunk-image-centered.component';
import { ChunkVideoComponent } from './video/chunk-video/chunk-video.component';
import { ChunkImageFullComponent } from './image/chunk-image-full/chunk-image-full.component';
import { ChunkNumberedListComponent } from './list/chunk-numbered-list/chunk-numbered-list.component';
import { ChunkMultipleAnswersComponent } from './activity/chunk-multiple-answers/chunk-multiple-answers.component';
import { ChunkBulletedListComponent } from './list/chunk-bulleted-list/chunk-bulleted-list.component';

@Injectable()
export class ChunkService {

  constructor() { }


  createComponentFromJSON(chunkItem): Chunk {
    let component: any;
    switch (chunkItem.type) {
      case 'heading':
        component = ChunkHeadingComponent;
        break;
      case 'subheading':
        component = ChunkSubheadingComponent;
        break;
      case 'text':
        component = ChunkTextComponent;
        break;
      case 'twoColumn':
        component = ChunkTwoColumnComponent;
        break;
      case 'headingText':
        component = ChunkHeadingTextComponent;
        break;
      case 'subheadingText':
        component = ChunkSubheadingTextComponent;
        break;
      case 'checkboxList':
        component = ChunkCheckboxListComponent;
        break;
      case 'multipleChoice':
        component = ChunkMultipleChoiceComponent;
        break;
      case 'imageCentered':
        component = ChunkImageCenteredComponent;
        break;
      case 'video':
        component = ChunkVideoComponent;
        break;
      case 'imageFull':
        component = ChunkImageFullComponent;
        break;
      case 'numberedList':
        component = ChunkNumberedListComponent;
        break;
      case 'bulletedList':
        component = ChunkBulletedListComponent;
        break;
      case 'multipleAnswers':
        component = ChunkMultipleAnswersComponent;
        break;
      default:
        break;
    }
    return new Chunk(component, chunkItem.attributes, chunkItem.id, chunkItem.parentLesson);
  }
}
