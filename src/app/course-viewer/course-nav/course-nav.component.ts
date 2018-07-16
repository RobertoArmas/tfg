import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../../course-data.service';
import { Course } from '../../../assets/data/classes/course';
import { Section } from '../../../assets/data/classes/section';
import { Lesson } from '../../../assets/data/classes/lesson';

@Component({
  selector: 'app-course-nav',
  templateUrl: './course-nav.component.html',
  styleUrls: ['./course-nav.component.css'],
})
export class CourseNavComponent implements OnInit {
  course: Course = new Course();
  sections: Section[] = [];
  lessons: Lesson[] = [];

  constructor(private courseDataService: CourseDataService) { }

  ngOnInit() {
    this.courseDataService
      .getCourseAttributes()
      .subscribe(
        (course) => {
          this.course = course;
        }
      );

    this.courseDataService
      .getAllSections()
      .subscribe(
        (sections) => {
          this.sections = sections;
        }
      );

      this.courseDataService
      .getAllLessons()
      .subscribe(
        (lessons) => {
          for (const section of this.sections) {
            section.lessons = lessons.filter((lesson) => {
              // tslint:disable-next-line:no-unused-expression
              section.id === lesson.sectionId;
            });
          }
          // this.lessons = lessons;
        }
      );
  }

  belongsToSection(lessonParentId, sectionId): boolean {
    return lessonParentId === sectionId;
  }
}
