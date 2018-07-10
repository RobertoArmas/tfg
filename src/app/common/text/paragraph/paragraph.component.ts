import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.css']
})
export class ParagraphComponent implements OnInit {
  @Input() data: string;

  constructor() {
    this.data = 'Error loading data';
  }

  ngOnInit() {
  }

}
