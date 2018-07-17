import { Component, OnInit, Input } from '@angular/core';
import { Basic } from '../../../../assets/data/classes/chunks/basic';

@Component({
  selector: 'app-chunk-subheading',
  templateUrl: './chunk-subheading.component.html',
  styleUrls: ['./chunk-subheading.component.css']
})
export class ChunkSubheadingComponent implements OnInit {
  @Input() attributes: Basic;

  constructor() {
    this.attributes = new Basic();
  }

  ngOnInit() {
    if (this.attributes.data === undefined) { this.attributes.data = 'Subheading'; }
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 0; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }
  }

}
