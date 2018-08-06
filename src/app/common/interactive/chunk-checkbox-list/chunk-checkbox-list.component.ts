import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { CheckboxList } from './CheckboxList';
import { IntersectionObserverService } from '../../intersection-observer.service';
import { Lesson } from '../../../course-viewer/lesson-detail/Lesson';

@Component({
  selector: 'app-chunk-checkbox-list',
  templateUrl: './chunk-checkbox-list.component.html',
  styleUrls: ['./chunk-checkbox-list.component.css']
})
export class ChunkCheckboxListComponent implements OnInit, AfterViewInit {
  @Input() attributes: CheckboxList;
  @Input() id: string;
  @Input() parentLesson: Lesson;
  sampleItems: string[];

  constructor(
    private intersectionObserverService: IntersectionObserverService
  ) {
    this.attributes = new CheckboxList();
    this.sampleItems = [
      // tslint:disable:max-line-length
      'Say yes more. Yes opens doors. No closes them. Yes pushes us. No keeps us safe at home. Imagine all the opportunities waiting for a yes.',
      'Let go of expectation. You’ve done your best to prepare. Now, let go. There’s no one way your life should unfold. Enjoy the journey.',
      'Welcome diversions. The most rewarding adventures often start with an unexpected detour. Perhaps that distraction will guide you onward.'
    ];
  }

  ngOnInit() {
    if (this.attributes.items === undefined) { this.attributes.items = this.sampleItems; }
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 0; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }
  }
  ngAfterViewInit() {
    this.attributes.statementData = this.attributes.items[0];
    this.intersectionObserverService.createObserver(this.id, this.attributes, this.parentLesson);
  }
}
