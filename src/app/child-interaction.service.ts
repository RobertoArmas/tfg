import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ChildInteractionService {
  private startSidenavToggledSource = new Subject<boolean>();
  private endSidenavToggledSource = new Subject<boolean>();

  sartSidenavToggled$ = this.startSidenavToggledSource.asObservable();
  endSidenavToggled$ = this.endSidenavToggledSource.asObservable();

  toggleStartSidenav(toggled: boolean) {
    this.startSidenavToggledSource.next(toggled);
  }

  toggleEndSidenav(toggled: boolean) {
    this.endSidenavToggledSource.next(toggled);
  }

  constructor() { }
}
