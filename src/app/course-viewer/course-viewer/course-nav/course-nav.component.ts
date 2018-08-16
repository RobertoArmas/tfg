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
  redirectedToFirstLesson: boolean;

  constructor(
    private courseDataService: CourseDataService,
    private xapi: XapiService,
    private router: Router
  ) {
    this.redirectedToFirstLesson = false;
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
        if (!this.redirectedToFirstLesson) {
          this.redirectToFirstLesson(section.id, lessons[0].id);
        }
      }
    );
  }

  navigateToLesson(lesson: LessonData, sectionId: string) {
    this.router.navigate(['/course-viewer/section/' + sectionId + '/lesson/' + lesson.id]);
    this.xapi.navigatedTo(lesson);
  }

  redirectToFirstLesson(sectionId: string, lessonId: string) {
    this.router.navigate(['/course-viewer/section/' + sectionId + '/lesson/' + lessonId]);
    this.redirectedToFirstLesson = true;
  }

}
