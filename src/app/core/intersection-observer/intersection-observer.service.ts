import { Injectable } from '@angular/core';
import { IntersectionObserverOptions } from './intersection-observer.config';
import { ChunkData } from '../../chunks/chunk.model';
import { LessonData } from '../../course-viewer/lesson.model';
import { XapiService } from '../xapi/xapi.service';


/**
 * Si se accede desde la sidenav a una lección los chunks no cuentan como 'acknowledged'
 * si no que serán 'reviewed' porque se supone que para asentar los conocimientos hay que
 * seguir el orden previsto de aprendizaje.
 */

@Injectable()
export class IntersectionObserverService {
  observer: IntersectionObserver;

  constructor(
    private xApiService: XapiService
  ) {}

  createObserver(id: string, attributes: ChunkData, parentLesson: LessonData) {

    // No se puede definir fuera como una función porque no obtiene el this.id correctamente
    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 1) {
          if (!attributes.reviewed) {
            this.xApiService.acknowledged(id, attributes, parentLesson);
            // TODO: Escribir en bd reviewed = true

          } else {
            this.xApiService.reviewed(id, attributes, parentLesson);
          }
        }
      });
    };

    this.observer = new IntersectionObserver(callback, IntersectionObserverOptions);

    const target = document.querySelector('#' + id);
    this.observer.observe(target);
  }
}
