import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-learning';
  opened: boolean;

  constructor() {
    this.opened = true;
  }

  toggleSideNav() {
    this.opened = !this.opened;
  }
}
