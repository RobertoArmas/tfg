import { Component, OnInit } from '@angular/core';
import { CourseData } from '../../course-viewer/course.model';
import { CourseDataService } from '../../core/course-data.service';
import { XapiService } from '../../core/xapi/xapi.service';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  course: CourseData;

  courses: CourseData[];

  constructor(
    private xapi: XapiService,
    private courseDataService: CourseDataService
  ) { }

  ngOnInit() {
    this.getCourseInformation();
    this.getCoursesData();
  }
  getCoursesData() {
    this.courseDataService
      .getCoursesData()
      .subscribe(
        (courses) => {
          this.courses = courses;
          this.courses.forEach(course => {
            const lessons = [];
            this.courseDataService.getCourseNumberOfLessons(course.id)
              .subscribe(
                numberOfLessons => {
                  lessons.push(numberOfLessons);
                  course.NumberOfLessons = lessons.length;
                }
              );
          });
        }
      );
  }
  getCourseInformation() {
    this.courseDataService
      .getCourseInformation()
      .subscribe(
        (course) => {
          this.course = course;
        }
      );
  }

  sendStartStatement(courseId: string) {
    this.courseDataService.courseId = courseId;
    this.getCourseInformation();
    this.xapi.started(this.course);
  }


  getCourseNumberOfLessons(courseId) {
    const NumberOfLessonsSubscription = this.courseDataService.getCourseNumberOfLessons(courseId)
      .subscribe(
        numberOfLessons => {
          console.log(numberOfLessons.length);
          return numberOfLessons.length;
        }
      );

    // NumberOfLessonsSubscription.unsubscribe();
  }
}
