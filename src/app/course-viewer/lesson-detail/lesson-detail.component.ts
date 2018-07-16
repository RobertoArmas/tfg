import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../../assets/data/classes/lesson';
import { Course } from '../../../assets/data/classes/course';
import { CourseDataService } from '../../course-data.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css'],
})
export class LessonDetailComponent implements OnInit {
  lesson: Lesson;
  course: Course = new Course();
  id: string;

  constructor(
    private courseDataService: CourseDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    // this.courseDataService
    // .getCourse()
    // .subscribe(
    //   (course) => {
    //     this.course = course;
    //   }
    // );

    this.getLesson(this.id);
  }

  private getLesson(id: string) {
    // console.log(this.course.title);
    // this.course.sections.find((section) => {
    //   console.log(section);
    //   return section.id === 'Sección 1';
    // });
  }

}
