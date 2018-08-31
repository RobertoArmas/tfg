import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TwoCol } from './TwoCol';
import { IntersectionObserverService } from '../../../core/intersection-observer/intersection-observer.service';
import { LessonData } from '../../../course-viewer/lesson.model';


@Component({
  selector: 'app-chunk-two-column',
  templateUrl: './chunk-two-column.component.html',
  styleUrls: ['./chunk-two-column.component.scss']
})
export class ChunkTwoColumnComponent implements OnInit, AfterViewInit {
  @Input() attributes: TwoCol;
  @Input() id: string;
  @Input() parentLesson: LessonData;

  constructor(
    private intersectionObserverService: IntersectionObserverService
  ) {
    this.attributes = new TwoCol();
  }

  ngOnInit() {
    // tslint:disable:max-line-length
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 30; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }
  }

  ngAfterViewInit() {
    this.attributes.statementData = this.attributes.dataCol1;
    this.intersectionObserverService.createObserver(this.id, this.attributes, this.parentLesson);
  }
}
