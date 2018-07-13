import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  startSideNavOpen: boolean;
  endSideNavOpen: boolean;

  constructor() {
    this.startSideNavOpen = true;
    this.endSideNavOpen = false;
  }

  toggleStartSideNav() {
    this.startSideNavOpen = !this.startSideNavOpen;
  }

  toggleEndSideNav() {
    this.endSideNavOpen = !this.endSideNavOpen;
  }
}
