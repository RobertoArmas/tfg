import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { CheckboxList } from './CheckboxList';
import { IntersectionObserverService } from '../../../core/intersection-observer/intersection-observer.service';
import { LessonData } from '../../../course-viewer/lesson.model';

@Component({
  selector: 'app-chunk-checkbox-list',
  templateUrl: './chunk-checkbox-list.component.html',
  styleUrls: ['./chunk-checkbox-list.component.scss']
})
export class ChunkCheckboxListComponent implements OnInit, AfterViewInit {
  @Input() attributes: CheckboxList;
  @Input() id: string;
  @Input() parentLesson: LessonData;
  sampleItems: string[];

  constructor(
    private intersectionObserverService: IntersectionObserverService
  ) {
    this.attributes = new CheckboxList();
  }

  ngOnInit() {
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 0; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }
  }
  ngAfterViewInit() {
    this.attributes.statementData = this.attributes.items[0];
    this.intersectionObserverService.createObserver(this.id, this.attributes, this.parentLesson);
  }
}
