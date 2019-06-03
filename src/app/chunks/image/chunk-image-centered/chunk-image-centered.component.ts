import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ImageCentered } from './image-centered';

import { IntersectionObserverService } from '../../../core/intersection-observer/intersection-observer.service';
import { Lesson } from '../../../course-viewer/lesson.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chunk-image-centered',
  templateUrl: './chunk-image-centered.component.html',
  styleUrls: ['./chunk-image-centered.component.scss']
})
export class ChunkImageCenteredComponent implements OnInit, AfterViewInit {
  @Input() attributes: ImageCentered;
  @Input() id: string;
  @Input() parentLesson: Lesson;
  profileUrl: Observable<string | null>;
  isLoaded: boolean;
  imageRole = '';
  captionId: string;

  constructor(
    private intersectionObserverService: IntersectionObserverService
  ) {
    this.attributes = new ImageCentered();
    this.isLoaded = false;
  }

  ngOnInit() {
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 30; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }
    if (this.attributes.longDesc === undefined) { this.attributes.backgroundColor = ''; }
    if (this.attributes.isDecorative === true) { this.imageRole = 'presentation'; } else {this.imageRole = ''; }
    this.captionId = this.id + '-caption';
  }

  ngAfterViewInit() {
    this.attributes.statementData = this.attributes.caption;
    this.intersectionObserverService.createObserver(this.captionId, this.attributes, this.parentLesson);
  }

  removePlaceholder() {
    this.isLoaded = true;
  }
}
