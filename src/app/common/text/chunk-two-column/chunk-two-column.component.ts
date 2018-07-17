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
    if (this.attributes.dataCol1 === undefined) { this.attributes.dataCol1 = 'By all means, write your to-do list. Make careful arrangements. Choose your traveling companions. Pack up your talismans. And then scrap your well-thought out plan when your intuition whispers, "This way."'; }
    if (this.attributes.dataCol2 === undefined) { this.attributes.dataCol2 = 'We open ourselves to discovery by following our deepest questions. If we take them seriously, they teach us everything we want to know. If we abandon them, we forfeit a powerful chance to become someone new.'; }
    if (this.attributes.paddingTop === undefined) { this.attributes.paddingTop = 30; }
    if (this.attributes.paddingBottom === undefined) { this.attributes.paddingBottom = 30; }
    if (this.attributes.backgroundColor === undefined) { this.attributes.backgroundColor = '#ffffff'; }
  }

}
