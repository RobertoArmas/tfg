import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Basic } from '../../text/Basic';
import { LessonData } from 'src/app/course-viewer/lesson.model';
import { IntersectionObserverService } from 'src/app/core/intersection-observer/intersection-observer.service';
import { Video } from './Video';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chunk-video',
  templateUrl: './chunk-video.component.html',
  styleUrls: ['./chunk-video.component.scss']
})
export class ChunkVideoComponent implements OnInit, AfterViewInit {
  @Input() attributes: Video;
  @Input() id: string;
  @Input() parentLesson: LessonData;

  safeUrl: any;
  constructor(
    private sanitizer: DomSanitizer,
    private intersectionObserverService: IntersectionObserverService
  ) {
    this.attributes = new Video();
  }

  ngOnInit() {
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 30; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }
    if (this.id === undefined) { this.id = 'notIndividualChunk'; }

    this.safeUrl = this.getEmbedUrl();
  }

  ngAfterViewInit() {
    if (this.id !== 'notIndividualChunk') {
      // this.attributes.statementData = this.attributes.data;
      this.intersectionObserverService.createObserver(this.id, this.attributes, this.parentLesson);
    }
  }

  getEmbedUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.attributes.videoId);
  }

}
