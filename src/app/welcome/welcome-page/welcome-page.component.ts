import { Component, OnInit } from '@angular/core';
import { CourseData } from '../../course-viewer/course.model';
import { XapiService } from '../../xapi/xapi.service';
import { CourseDataService } from '../../course-viewer/course-data.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  course: CourseData;

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
