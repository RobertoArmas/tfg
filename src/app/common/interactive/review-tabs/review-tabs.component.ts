import { Component, OnInit, Input } from '@angular/core';
import { Tab } from 'src/assets/classes/tab';

@Component({
  selector: 'app-review-tabs',
  templateUrl: './review-tabs.component.html',
  styleUrls: ['./review-tabs.component.css']
})
export class ReviewTabsComponent implements OnInit {
  @Input() tabs: Tab[];

  constructor() { }

  ngOnInit() {
  }

}
