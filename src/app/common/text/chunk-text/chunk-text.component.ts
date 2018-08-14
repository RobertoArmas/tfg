import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Basic } from '../Basic';
import { IntersectionObserverService } from '../../intersection-observer.service';
import { LessonData } from '../../../course-viewer/lesson.model';

@Component({
  selector: 'app-chunk-text',
  templateUrl: './chunk-text.component.html',
  styleUrls: ['./chunk-text.component.css']
})
export class ChunkTextComponent implements OnInit, AfterViewInit {
  @Input() attributes: Basic;
  @Input() id: string;
  @Input() parentLesson: LessonData;

  constructor(
    private intersectionObserverService: IntersectionObserverService
  ) {
    this.attributes = new Basic();
  }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    if (this.attributes.data === undefined) { this.attributes.data = 'When we show up to the present moment with all of our senses, we invite the world to fill us with joy. The pains of the past are behind us. The future has yet to unfold. But the now is full of beauty simply waiting for our attention.'; }
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 30; }
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
