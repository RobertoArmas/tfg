import { Component, OnInit, Input } from '@angular/core';
import { Tab } from 'src/assets/classes/tab';

import * as TinCan from 'tincanjs';

@Component({
  selector: 'app-review-tabs',
  templateUrl: './review-tabs.component.html',
  styleUrls: ['./review-tabs.component.css']
})
export class ReviewTabsComponent implements OnInit {
  @Input() tabs: Tab[];

  lrs: any;

  constructor() {
  }

  ngOnInit() {
    try {
      this.lrs = new TinCan.LRS(
        {
          endpoint: 'https://cloud.scorm.com/tc/USCLE7C6OK/sandbox/ ',
          username: 'jespinosa@atnova.com',
          password: 'pedag0g1c0',
          allowFail: false
        }
      );
    } catch (error) {
      console.log('Failed to setup LRS object: ', error);
    }
  }

}
