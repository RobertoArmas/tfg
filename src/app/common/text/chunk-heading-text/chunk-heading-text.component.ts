import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chunk-heading-text',
  templateUrl: './chunk-heading-text.component.html',
  styleUrls: ['./chunk-heading-text.component.css']
})
export class ChunkHeadingTextComponent implements OnInit {
  @Input() paddingTop: number;
  @Input() paddingBottom: number;
  @Input() backgroundColor: string;
  @Input() headingData: string;
  @Input() textData: string;

  constructor() {
    this.paddingTop = 30;
    this.paddingBottom = 0;
    this.backgroundColor = '#ffffff';
    this.headingData = 'Combined title and paragraph';
    this.textData = 'Combined title and paragraph text.';
  }

  ngOnInit() {
  }

}
