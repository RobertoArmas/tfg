import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chunk-text',
  templateUrl: './chunk-text.component.html',
  styleUrls: ['./chunk-text.component.css']
})
export class ChunkTextComponent implements OnInit {
  @Input() data: string;
  @Input() paddingTop: number;
  @Input() paddingBottom: number;
  @Input() backgroundColor: string;

  constructor() {
    // tslint:disable-next-line:max-line-length
    this.data = 'When we show up to the present moment with all of our senses, we invite the world to fill us with joy. The pains of the past are behind us. The future has yet to unfold. But the now is full of beauty simply waiting for our attention.';
    this.paddingTop = 30;
    this.paddingBottom = 30;
    this.backgroundColor = '#ffffff';
  }

  ngOnInit() {

  }

}
