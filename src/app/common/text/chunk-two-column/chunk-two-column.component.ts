import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TwoCol } from './TwoCol';
import { IntersectionObserverService } from '../../intersection-observer.service';

@Component({
  selector: 'app-chunk-two-column',
  templateUrl: './chunk-two-column.component.html',
  styleUrls: ['./chunk-two-column.component.css']
})
export class ChunkTwoColumnComponent implements OnInit, AfterViewInit {
  @Input() attributes: TwoCol;
  @Input() id: string;

  constructor(
    private intersectionObserverService: IntersectionObserverService
  ) {
    this.attributes = new TwoCol();
  }

  ngOnInit() {
    // tslint:disable:max-line-length
    if (this.attributes.dataCol1 === undefined) { this.attributes.dataCol1 = ''; }
    if (this.attributes.dataCol2 === undefined) { this.attributes.dataCol2 = ''; }
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 30; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }
  }

  ngAfterViewInit() {
    this.intersectionObserverService.createObserver(this.id, this.attributes.reviewed);
  }
}
