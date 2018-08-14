import { Component, OnInit } from '@angular/core';

import { Course } from '../../course.model';
import { Section } from '../../section.model';
import { CourseDataService } from '../../../core/course-data.service';
import { LessonData } from '../../lesson.model';
import { Router } from '@angular/router';
import { XapiService } from '../../../core/xapi/xapi.service';

@Component({
  selector: 'app-course-nav',
  templateUrl: './course-nav.component.html',
  styleUrls: ['./course-nav.component.css']
})
export class CourseNavComponent implements OnInit {

  course: Course = new Course();
  sections: Section[] = [];

  constructor(
    private courseDataService: CourseDataService,
    private xapi: XapiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCourseData();
    this.getSectionsData();
    this.redirectToFirstLesson();
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

  redirectToFirstLesson() {
    let firstLessonId: string;
    this.courseDataService.getAllLessons().subscribe(
      (lessons) => {
        firstLessonId = lessons[0].id;
        this.router.navigate(['/course/' + firstLessonId]);
      }
    );
  }

}
