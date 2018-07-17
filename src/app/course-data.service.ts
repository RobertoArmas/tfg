import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Course } from './course-viewer/Course';
import { Observable } from 'rxjs';
import { Lesson } from './course-viewer/lesson-detail/Lesson';
import { Section } from './course-viewer/Section';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {

  constructor(private api: ApiService) { }

  getCourseAttributes(): Observable<Course> {
    return this.api.getCourse();
  }

  getAllSections(): Observable<Section[]> {
    return this.api.getAllSections();
  }

  getAllLessons(): Observable<Lesson[]> {
    return this.api.getAllLessons();
  }

  getSectionLessons(sectionId: string): Observable<Lesson[]> {
    return this.api.getSectionLessons(sectionId);
  }

  getLesson(lessonId: string): Observable<Lesson> {
    return this.api.getLesson(lessonId);
  }
}
