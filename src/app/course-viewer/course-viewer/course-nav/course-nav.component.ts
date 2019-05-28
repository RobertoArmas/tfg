import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Course } from '../../course.model';
import { Section } from '../../section.model';
import { CourseDataService } from '../../../core/course-data.service';
import { LessonData } from '../../lesson.model';
import { XapiService } from '../../../core/xapi/xapi.service';
import { ProgressService } from 'src/app/core/progress.service';
import { retryWhen, delayWhen, tap } from 'rxjs/operators';
import { timer } from 'rxjs';
@Component({
  selector: 'app-course-nav',
  templateUrl: './course-nav.component.html',
  styleUrls: ['./course-nav.component.scss']
})
export class CourseNavComponent implements OnInit, AfterViewInit {

  course: Course = new Course();
  sections: Section[] = [];
  unlockedLessons$: string[];
  mainLessonElementId = 'LessonCounter';

  constructor(
    private courseDataService: CourseDataService,
    private xapi: XapiService,
    public progressStore: ProgressService
  ) {

    /**
     * Mismo caso que en CourseViewer para recuperarse del error
     * cuando un usuario accede por primera vez con la sesión de Google iniciada
     */
    this.progressStore.getUnlockedLessons()
    .pipe(
      retryWhen(errors => {
        return errors
                    .pipe(
                        delayWhen(() => timer(2000)),
                        tap(() => console.log('retrying...'))
                    );
      })
    )
    .subscribe(
      unlockedLessons => {
        if (unlockedLessons) {
          this.unlockedLessons$ = unlockedLessons;
        } else {
          this.progressStore.createUserProgress();
        }
      }
    );
  }

  ngOnInit() {
    this.getCourseInformation();
    this.getCourseSections();
  }

  ngAfterViewInit() {
    this.focusCourseTitle();
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

  focusTitle() {
    const element = document.getElementById(this.mainLessonElementId);
    element.focus();
  }

  focusCourseTitle() {
    const element = document.getElementById('titleRegion');
    element.focus();
  }

  disabledLessonAccessibleText(sectionId, lessonId) {
    if (this.unlockedLessons$.indexOf(sectionId + lessonId) === -1) {
      return '. Bloqueada. Completa las lecciones anteriores para acceder a esta.';
    } else if (this.unlockedLessons$.indexOf(sectionId + lessonId) !== -1 && this.unlockedLessons$.indexOf(sectionId + lessonId) ===
              (this.unlockedLessons$.length - 1) && !this.progressStore.courseComplete) {
      return '. Lección actual.';
    }
    return '. Lección completada.';
  }
}
