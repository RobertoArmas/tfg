import { Injectable } from '@angular/core';
import { XapiService } from '../xapi/xapi.service';
import { IntersectionObserverOptions } from './intersection-observer-options';


/**
 * Si se accede desde la sidenav a una lección los chunks no cuentan como 'acknowledged'
 * si no que serán 'reviewed' porque se supone que para asentar los conocimientos hay que
 * seguir el orden previsto de aprendizaje.
 */

@Injectable({
  providedIn: 'root'
})
export class IntersectionObserverService {
  observer: IntersectionObserver;

  constructor(
    private xApiService: XapiService
  ) {}

  createObserver(id: string, isAcknowledged) {

    // No se puede definir fuera como una función porque no obtiene el this.id correctamente
    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio === 1) {
          if (!isAcknowledged) {
            this.xApiService.acknowledged(id);
            // TODO: Escribir en bd reviewed = true

          } else {
            this.xApiService.reviewed(id);
          }
        }
      });
    };

    this.observer = new IntersectionObserver(callback, IntersectionObserverOptions);

    const target = document.querySelector('#' + id);
    this.observer.observe(target);
  }
}
