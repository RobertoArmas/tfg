import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-viewer',
  templateUrl: './course-viewer.component.html',
  styleUrls: ['./course-viewer.component.css']
})
export class CourseViewerComponent implements OnInit {
  startSideNavOpen: boolean;
  endSideNavOpen: boolean;

  constructor() {
    this.startSideNavOpen = true;
    this.endSideNavOpen = false;
  }

  ngOnInit() {
  }

  toggleStartSideNav() {
    this.startSideNavOpen = !this.startSideNavOpen;
  }

  toggleEndSideNav() {
    this.endSideNavOpen = !this.endSideNavOpen;
  }
}
