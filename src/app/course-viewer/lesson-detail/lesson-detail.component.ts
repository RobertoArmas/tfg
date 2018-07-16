import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../../assets/data/classes/lesson';
import { Course } from '../../../assets/data/classes/course';
import { CourseDataService } from '../../course-data.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {
  lesson: Lesson;
  id: string;

  constructor(
    private courseDataService: CourseDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.courseDataService
      .getLesson(this.id)
      .subscribe(
        (lesson) => {
          this.lesson = lesson[0];
        }
      );
    });
  }
}
