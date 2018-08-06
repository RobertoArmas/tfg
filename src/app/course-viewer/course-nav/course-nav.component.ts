import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../course-data.service';
import { Course } from '../Course';
import { Section } from '../Section';
import { Lesson } from '../lesson-detail/Lesson';
import { XapiService } from '../../xapi/xapi.service';

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

  navigateToLesson(lesson: Lesson) {
    this.xapi.navigatedTo(lesson);
  }
}
