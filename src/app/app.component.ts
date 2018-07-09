import { Component } from '@angular/core';
import { paragraphs } from '../assets/data/paragraphs-sample';
import { Tabs } from '../assets/data/tabs-sample';
import { Tab } from '../assets/classes/tab';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-learning';
  opened: boolean;
  sampleContent: string[];
  sampleTabsContent: Tab[];

  constructor() {
    this.opened = true;
    this.sampleContent = paragraphs;
    this.sampleTabsContent = Tabs;
  }

  toggleSideNav() {
    this.opened = !this.opened;
  }
}
