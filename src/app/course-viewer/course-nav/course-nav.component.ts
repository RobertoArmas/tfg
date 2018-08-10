import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../course-data.service';
import { XapiService } from '../../xapi/xapi.service';
import { Course } from '../course.model';
import { Section } from '../section.model';
import { LessonData } from '../lesson-detail/lesson.model';


@Component({
  selector: 'app-course-nav',
  templateUrl: './course-nav.component.html',
  styleUrls: ['./course-nav.component.css'],
})
export class CourseNavComponent implements OnInit {
  course: Course = new Course();
  sections: Section[] = [];

  constructor(
    private courseDataService: CourseDataService,
    private xapi: XapiService
  ) { }

  ngOnInit() {
    this.getCourseData();
    this.getSectionsData();
  }

  getCourseData() {
    this.courseDataService
    .getCourseAttributes()
    .subscribe(
      (course) => {
        this.course = course;
      }
    );
  }

  getSectionsData() {
    this.courseDataService
    .getAllSections()
    .subscribe(
      (sections) => {
        sections.map((section) => {
          this.getSectionLessons(section);
        });
        this.sections = sections;
      }
    );
  }

  getSectionLessons(section: Section) {
    this.courseDataService.getSectionLessons(section.id)
    .subscribe(
      (lessons) => {
        section.lessons = lessons;
      }
    );
  }

  navigateToLesson(lesson: LessonData) {
    this.xapi.navigatedTo(lesson);
  }
}
