import { Component, OnInit, Input } from '@angular/core';
import { TwoCol } from '../../../../assets/data/classes/chunks/twoCol';

@Component({
  selector: 'app-chunk-two-column',
  templateUrl: './chunk-two-column.component.html',
  styleUrls: ['./chunk-two-column.component.css']
})
export class ChunkTwoColumnComponent implements OnInit {
  @Input() attributes: TwoCol;

  constructor() {
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

}
