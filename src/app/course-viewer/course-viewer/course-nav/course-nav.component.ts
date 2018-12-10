import { Component, OnInit } from '@angular/core';

import { Course } from '../../course.model';
import { Section } from '../../section.model';
import { CourseDataService } from '../../../core/course-data.service';
import { LessonData } from '../../lesson.model';import { XapiService } from '../../../core/xapi/xapi.service';
import { ProgressService } from 'src/app/core/progress.service';
@Component({
  selector: 'app-course-nav',
  templateUrl: './course-nav.component.html',
  styleUrls: ['./course-nav.component.css']
})
export class CourseNavComponent implements OnInit {

  course: Course = new Course();
  sections: Section[] = [];
  redirectedToFirstLesson: boolean;
  unlockedLessons$: string[];

  constructor(
    private courseDataService: CourseDataService,
    private xapi: XapiService,
    private progressStore: ProgressService
  ) {
    this.redirectedToFirstLesson = false;
    this.progressStore.getUnlockedLessons().subscribe(
      unlockedLessons => {
        this.unlockedLessons$ = unlockedLessons;
      }
    )
  }

  ngOnInit() {
    this.getCourseInformation();
    this.getCourseSections();
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

  getCourseSections() {
    this.courseDataService
      .getCourseSections()
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
    this.courseDataService
    .getSectionLessons(section.id)
    .subscribe(
      (lessons) => {
        section.lessons = lessons;
      }
    );
  }

  navigateToLesson(lesson: LessonData, sectionId: string) {
    this.xapi.navigatedTo(lesson);
  }
}
