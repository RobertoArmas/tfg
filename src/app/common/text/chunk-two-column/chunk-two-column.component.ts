import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chunk-two-column',
  templateUrl: './chunk-two-column.component.html',
  styleUrls: ['./chunk-two-column.component.css']
})
export class ChunkTwoColumnComponent implements OnInit {
  @Input() dataCol1: string;
  @Input() dataCol2: string;
  @Input() paddingTop: number;
  @Input() paddingBottom: number;
  @Input() backgroundColor: string;
  constructor() {
    this.paddingTop = 30;
    this.paddingBottom = 30;
    this.backgroundColor = '#ffffff';
    // tslint:disable-next-line:max-line-length
    this.dataCol1 = 'By all means, write your to-do list. Make careful arrangements. Choose your traveling companions. Pack up your talismans. And then scrap your well-thought out plan when your intuition whispers, "This way."';
    // tslint:disable-next-line:max-line-length
    this.dataCol2 = 'We open ourselves to discovery by following our deepest questions. If we take them seriously, they teach us everything we want to know. If we abandon them, we forfeit a powerful chance to become someone new.';
  }

  ngOnInit() {
  }

}
