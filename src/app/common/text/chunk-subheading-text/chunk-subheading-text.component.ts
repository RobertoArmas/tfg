import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chunk-subheading-text',
  templateUrl: './chunk-subheading-text.component.html',
  styleUrls: ['./chunk-subheading-text.component.css']
})
export class ChunkSubheadingTextComponent implements OnInit {
  @Input() subheadingData: string;
  @Input() textData: string;
  @Input() paddingTop: number;
  @Input() paddingBottom: number;
  @Input() backgroundColor: string;

  constructor() {
    this.paddingTop = 30;
    this.paddingBottom = 0;
    this.backgroundColor = '#ffffff';
    this.subheadingData = 'Combined subtitle and paragraph';
    this.textData = 'Combined subtitle and paragraph text.';
  }

  ngOnInit() {
  }

}
