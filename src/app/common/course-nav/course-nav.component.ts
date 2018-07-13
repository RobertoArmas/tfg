import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../../course-data.service';
import { Course } from '../../../assets/data/classes/course';

@Component({
  selector: 'app-course-nav',
  templateUrl: './course-nav.component.html',
  styleUrls: ['./course-nav.component.css'],
  // providers: [CourseDataService]
})
export class CourseNavComponent implements OnInit {
  course: Course = new Course();

  constructor(private courseDataService: CourseDataService) { }

  ngOnInit() {
    this.courseDataService
      .getCourse()
      .subscribe(
        (course) => {
          this.course = course;
        }
      );
  }
}
