import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chunk-subheading-text',
  templateUrl: './chunk-subheading-text.component.html',
  styleUrls: ['./chunk-subheading-text.component.css']
})
export class ChunkSubheadingTextComponent implements OnInit {
  @Input() paddingTop: number;
  @Input() paddingBottom: number;
  @Input() backgroundColor: string;
  @Input() subheadingData: string;
  @Input() textData: string;

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
