import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Implementación de comunicación entre componentes mediante servicio porque están
 * conectados mediante un <router-outlet>
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
