import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chunk-subheading',
  templateUrl: './chunk-subheading.component.html',
  styleUrls: ['./chunk-subheading.component.css']
})
export class ChunkSubheadingComponent implements OnInit {
  @Input() data: string;
  @Input() paddingTop: number;
  @Input() paddingBottom: number;
  @Input() backgroundColor: string;

  constructor() {
    this.data = 'Subheading';
    this.paddingTop = 30;
    this.paddingBottom = 0;
    this.backgroundColor = '#ffffff';
  }

  ngOnInit() {
  }

}
