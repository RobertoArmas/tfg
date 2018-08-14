import { Component, OnInit } from '@angular/core';
import { CourseData } from '../../course-viewer/course.model';
import { CourseDataService } from '../../core/course-data.service';
import { XapiService } from '../../core/xapi/xapi.service';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  course: CourseData;

  constructor(private xapi: XapiService, private courseDataService: CourseDataService) { }

  ngOnInit() {
    this.getCourseData();
  }

  getCourseData() {
    // this.courseDataService
    // .getCourseAttributes()
    // .subscribe(
    //   (course) => {
    //     this.course = course;
    //   }
    // );

    this.courseDataService
      .getCourseData()
      .subscribe(
        (course) => {
          this.course = course;
          console.log(this.course);
        }
      );
  }

  sendStartStatement() {
    this.xapi.started(this.course);
  }

}
