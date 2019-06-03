import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { NumberedList } from '../chunk-numbered-list/numbered-list';
import { LessonData } from 'src/app/course-viewer/lesson.model';
import { IntersectionObserverService } from 'src/app/core/intersection-observer/intersection-observer.service';

@Component({
  selector: 'app-chunk-bulleted-list',
  templateUrl: './chunk-bulleted-list.component.html',
  styleUrls: ['./chunk-bulleted-list.component.scss']
})
export class ChunkBulletedListComponent implements OnInit, AfterViewInit {
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
