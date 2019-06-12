import { Injectable } from '@angular/core';
import { IntersectionObserverOptions } from './intersection-observer.config';
import { ChunkData } from '../../chunks/chunk.model';
import { LessonData } from '../../course-viewer/lesson.model';
import { XapiService } from '../xapi/xapi.service';
import { ProgressService } from '../progress.service';


/**
 * Si se accede desde la sidenav a una lección los chunks no cuentan como 'acknowledged'
 * si no que serán 'reviewed' porque se supone que para asentar los conocimientos hay que
 * seguir el orden previsto de aprendizaje.
 */

@Injectable()
export class IntersectionObserverService {
  observer: IntersectionObserver;
  acknowledgedChunks: string[] = [];

  constructor(
    private xApiService: XapiService,
    private progressStore: ProgressService
  ) {
    this.progressStore.getAcknowledgedChunks()
    .subscribe(
      acknowledgedChunks => {
        this.acknowledgedChunks = acknowledgedChunks;
      }
    );
  }

  createObserver(id: string, attributes: ChunkData, parentLesson: LessonData) {

    // No se puede definir fuera como una función porque no obtiene el this.id correctamente
    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 1) {
          if (this.acknowledgedChunks.indexOf(id) === -1) {
            this.progressStore.acknowledgeChunk(id);
            this.xApiService.acknowledged(id, attributes, parentLesson);
          } else {
            this.xApiService.reviewed(id, attributes, parentLesson);
          }


          // if (!attributes.reviewed) {
          //   this.xApiService.acknowledged(id, attributes, parentLesson);

          //   // TODO: Escribir en bd reviewed = true
          //   this.progressStore.acknowledgeChunk(id);

          // } else {
          //   this.xApiService.reviewed(id, attributes, parentLesson);
          // }
        }
      });
    };

    this.observer = new IntersectionObserver(callback, IntersectionObserverOptions);

    const target = document.querySelector('#' + id);
    this.observer.observe(target);
  }



  createLargeContentObserver(id: string, attributes: ChunkData, parentLesson: LessonData) {

    // No se puede definir fuera como una función porque no obtiene el this.id correctamente
    const callback = (entries) => {
      entries.forEach(entry => {
        console.log(entry.intersectionRatio);
        if (entry.intersectionRatio >= 0.6) {
          console.log('trigger!');
          if (this.acknowledgedChunks.indexOf(id) === -1) {
            this.progressStore.acknowledgeChunk(id);
            this.xApiService.acknowledged(id, attributes, parentLesson);
          } else {
            this.xApiService.reviewed(id, attributes, parentLesson);
          }


          // if (!attributes.reviewed) {
          //   this.xApiService.acknowledged(id, attributes, parentLesson);

          //   // TODO: Escribir en bd reviewed = true
          //   this.progressStore.acknowledgeChunk(id);

          // } else {
          //   this.xApiService.reviewed(id, attributes, parentLesson);
          // }
        }
      });
    };

    this.observer = new IntersectionObserver(callback, IntersectionObserverOptions);

    const target = document.querySelector('#' + id);
    this.observer.observe(target);
  }
}
