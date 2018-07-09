import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title-text',
  templateUrl: './title-text.component.html',
  styleUrls: ['./title-text.component.css']
})
export class TitleTextComponent implements OnInit {
  @Input() title: string;
  @Input() content: string[];

  constructor() { }

  ngOnInit() {
  }

}
