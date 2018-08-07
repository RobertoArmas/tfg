import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ImageCentered } from './image-centered';
import { Lesson } from '../../../course-viewer/lesson-detail/Lesson';
import { IntersectionObserverService } from '../../intersection-observer.service';

@Component({
  selector: 'app-chunk-image-centered',
  templateUrl: './chunk-image-centered.component.html',
  styleUrls: ['./chunk-image-centered.component.css']
})
export class ChunkImageCenteredComponent implements OnInit, AfterViewInit {
  @Input() attributes: ImageCentered;
  @Input() id: string;
  @Input() parentLesson: Lesson;

  constructor(
    private intersectionObserverService: IntersectionObserverService
  ) {
    this.attributes = new ImageCentered();
  }

  ngOnInit() {
    if (this.attributes.url === undefined) {this.attributes.url = '/assets/images/bicycle.jpg'; }
    if (this.attributes.caption === undefined) {this.attributes.caption = 'Pie de foto por defecto'; }
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 30; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }
  }

  ngAfterViewInit() {
    this.attributes.statementData = this.attributes.caption;
    this.intersectionObserverService.createObserver(this.id, this.attributes, this.parentLesson);
  }
}
