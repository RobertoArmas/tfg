import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { HeadingText } from '../HeadingText';
import { IntersectionObserverService } from '../../../core/intersection-observer/intersection-observer.service';
import { LessonData } from '../../../course-viewer/lesson.model';
import { Basic } from '../Basic';

@Component({
  selector: 'app-chunk-heading-text',
  templateUrl: './chunk-heading-text.component.html',
  styleUrls: ['./chunk-heading-text.component.scss']
})
export class ChunkHeadingTextComponent implements OnInit, AfterViewInit {
  @Input() attributes: HeadingText;
  @Input() id: string;
  @Input() parentLesson: LessonData;

  constructor(
    private intersectionObserverService: IntersectionObserverService
  ) {
    this.attributes = new HeadingText();
  }

  ngOnInit() {
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 0; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }
  }

  getHeadingAttributes(): Basic {
    return {
      data: this.attributes.headingData,
      paddingTop: 8,
      paddingBottom: 8
    };
  }

  getTextAttributes() {
    return {
      data: this.attributes.textData,
      paddingTop: 0,
      paddingBottom: 0
    };
  }

  ngAfterViewInit() {
      this.attributes.statementData = this.attributes.headingData;
      this.intersectionObserverService.createObserver(this.id, this.attributes, this.parentLesson);
  }
}
