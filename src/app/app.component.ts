import { Component } from '@angular/core';
import { SampleData } from '../assets/classes/sample-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  startSideNavOpen: boolean;
  endSideNavOpen: boolean;

  /********** SAMPLE DATA  **********/
  sampleParagraph: string;

  /********** SAMPLE DATA END  **********/

  constructor() {
    this.startSideNavOpen = true;
    this.endSideNavOpen = true;
    this.sampleParagraph = SampleData.paragraph;
  }

  toggleStartSideNav() {
    this.startSideNavOpen = !this.startSideNavOpen;
  }

  toggleEndSideNav() {
    this.endSideNavOpen = !this.endSideNavOpen;
  }
}
