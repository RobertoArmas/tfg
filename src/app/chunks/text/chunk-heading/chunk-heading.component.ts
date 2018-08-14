import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { IntersectionObserverService } from '../../../core/intersection-observer/intersection-observer.service';
import { LessonData } from '../../../course-viewer/lesson.model';
import { Basic } from '../Basic';

@Component({
  selector: 'app-chunk-heading',
  templateUrl: './chunk-heading.component.html',
  styleUrls: ['./chunk-heading.component.css']
})
export class ChunkHeadingComponent implements OnInit, AfterViewInit {
  @Input() attributes: Basic;
  @Input() id: string;
  @Input() parentLesson: LessonData;

  constructor(
    private intersectionObserverService: IntersectionObserverService
  ) {
    this.attributes = new Basic();
  }

  ngOnInit() {
    if (this.attributes.data === undefined) { this.attributes.data = 'Heading'; }
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 0; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }
    if (this.id === undefined) { this.id = 'notIndividualChunk'; }
  }

  ngAfterViewInit() {
    if (this.id !== 'notIndividualChunk') {
      this.attributes.statementData = this.attributes.data;
      this.intersectionObserverService.createObserver(this.id, this.attributes, this.parentLesson);
    }
  }
}
