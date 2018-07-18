import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

 /**
  * Comunica AppComponent y CourseViewerComponent porque el último se genera en un <router-outlet> y no se puede acceder a el directamente
  * Ver: https://angular.io/guide/component-interaction#parent-and-children-communicate-via-a-service
  */
@Injectable()
export class ChildInteractionService {
  private startSidenavToggledSource = new Subject<boolean>();
  private endSidenavToggledSource = new Subject<boolean>();

  sartSidenavToggled$ = this.startSidenavToggledSource.asObservable();
  endSidenavToggled$ = this.endSidenavToggledSource.asObservable();

  toggleStartSidenav() {
    this.startSidenavToggledSource.next();
  }

  toggleEndSidenav() {
    this.endSidenavToggledSource.next();
  }

  constructor() { }
}
