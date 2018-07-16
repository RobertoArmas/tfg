import { Component, OnInit } from '@angular/core';
import { ChildInteractionService } from '../child-interaction.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  templateUrl: './course-viewer.component.html',
  styleUrls: ['./course-viewer.component.css']
})
export class CourseViewerComponent implements OnInit {
  startSidenavOpen: boolean;
  endSidenavOpen: boolean;
  startSidenavSubscription: Subscription;
  endSidenavSubscription: Subscription;

  constructor(private childInteractionService: ChildInteractionService) {
    this.startSidenavOpen = true;
    this.endSidenavOpen = false;
    this.startSidenavSubscription = childInteractionService.sartSidenavToggled$.subscribe(
      toggle => {
        this.startSidenavOpen = !this.startSidenavOpen;
      }
    );
    this.endSidenavSubscription = childInteractionService.endSidenavToggled$.subscribe(
      toggle => {
        this.endSidenavOpen = !this.endSidenavOpen;
      }
    );
  }

  ngOnInit() {
  }

  // toggleStartSideNav() {
  //   this.startSideNavOpen = !this.startSideNavOpen;
  // }

  // toggleEndSideNav() {
  //   this.endSideNavOpen = !this.endSideNavOpen;
  // }
}
