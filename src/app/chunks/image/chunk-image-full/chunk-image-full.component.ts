import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ImageFull } from './image-full';

import { IntersectionObserverService } from '../../../core/intersection-observer/intersection-observer.service';
import { Lesson } from '../../../course-viewer/lesson.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chunk-image-full',
  templateUrl: './chunk-image-full.component.html',
  styleUrls: ['./chunk-image-full.component.scss']
})
export class ChunkImageFullComponent implements OnInit, AfterViewInit {
  @Input() attributes: ImageFull;
  @Input() id: string;
  @Input() parentLesson: Lesson;
  profileUrl: Observable<string | null>;
  isLoaded: boolean;
  imageRole = '';

  constructor(
    private intersectionObserverService: IntersectionObserverService
  ) {
    this.attributes = new ImageFull();
    this.isLoaded = false;
  }

  ngOnInit() {
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 30; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }
    if (this.attributes.longDesc === undefined) { this.attributes.backgroundColor = ''; }
    if (this.attributes.isDecorative === true) { this.imageRole = 'presentation'; } else {this.imageRole = ''; }
  }

  ngAfterViewInit() {
    this.attributes.statementData = this.attributes.caption;
    this.intersectionObserverService.createObserver(this.id, this.attributes, this.parentLesson);
  }

  removePlaceholder() {
    this.isLoaded = true;
  }
}
