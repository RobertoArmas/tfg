import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lesson-header',
  templateUrl: './lesson-header.component.html',
  styleUrls: ['./lesson-header.component.css']
})
export class LessonHeaderComponent {

  @Input() currentLesson: number;
  @Input() totalLessons: number;
  @Input() title: string;

  constructor() {
    this.currentLesson = 1;
    this.totalLessons = 1;
    this.title = 'Lección 1';
  }

}
