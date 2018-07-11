import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {
  @Input() currentLesson: number;
  @Input() totalLessons: number;
  @Input() title: string;

  constructor() {
    this.currentLesson = 1;
    this.totalLessons = 1;
    this.title = 'Lección 1';
  }

  ngOnInit() {
  }

}
