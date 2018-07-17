import { Component, OnInit, Input } from '@angular/core';
import { Basic } from '../../../../assets/data/classes/chunks/basic';

@Component({
  selector: 'app-chunk-heading',
  templateUrl: './chunk-heading.component.html',
  styleUrls: ['./chunk-heading.component.css']
})
export class ChunkHeadingComponent implements OnInit {
  @Input() attributes: Basic;

  constructor() {
    this.attributes = new Basic();
  }

  ngOnInit() {
    if (this.attributes.data === undefined) { this.attributes.data = 'Heading'; }
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 0; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }

  }

}
