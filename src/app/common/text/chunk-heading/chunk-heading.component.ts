import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chunk-heading',
  templateUrl: './chunk-heading.component.html',
  styleUrls: ['./chunk-heading.component.css']
})
export class ChunkHeadingComponent implements OnInit {
  @Input() data: string;
  @Input() paddingTop: number;
  @Input() paddingBottom: number;
  @Input() backgroundColor: string;
  @Input() attributes: any;

  constructor() {
    this.data = 'Heading';
    this.paddingTop = 30;
    this.paddingBottom = 0;
    this.backgroundColor = '#ffffff';
  }

  ngOnInit() {
  }

}
