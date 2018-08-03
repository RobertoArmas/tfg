import { Component, OnInit } from '@angular/core';
import { XapiService } from '../xapi/xapi.service';
import { CourseDataService } from '../course-viewer/course-data.service';
import { Course } from '../course-viewer/Course';

/**
 * Página de inicio de la aplicación
 */

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  course: Course;

  constructor(private xapi: XapiService, private courseDataService: CourseDataService) { }

  ngOnInit() {
    this.getCourseAttributes();
  }

  getCourseAttributes() {
    this.courseDataService
    .getCourseAttributes()
    .subscribe(
      (course) => {
        this.course = course;
      }
    );
  }

  sendStartStatement() {
    this.xapi.started(this.course);
  }
}
