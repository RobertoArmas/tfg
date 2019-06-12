import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { LessonData } from 'src/app/course-viewer/lesson.model';
import { NumberedList } from './numbered-list';
import { IntersectionObserverService } from 'src/app/core/intersection-observer/intersection-observer.service';

@Component({
  selector: 'app-chunk-numbered-list',
  templateUrl: './chunk-numbered-list.component.html',
  styleUrls: ['./chunk-numbered-list.component.scss']
})
export class ChunkNumberedListComponent implements OnInit, AfterViewInit {
  @Input() attributes: NumberedList;
  @Input() id: string;
  @Input() parentLesson: LessonData;

  constructor(
    private intersectionObserverService: IntersectionObserverService
  ) {
    this.attributes = new NumberedList;
   }

  ngOnInit() {
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 30; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }
  }



  ngAfterViewInit() {
    this.attributes.statementData = this.attributes.items.join(', ');
    this.intersectionObserverService.createObserver(this.id, this.attributes, this.parentLesson);
  }

}
