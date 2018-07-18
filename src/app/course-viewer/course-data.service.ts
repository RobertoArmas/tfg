import { Injectable } from '../../../node_modules/@angular/core';
import { ApiService } from '../api.service';
import { Observable } from '../../../node_modules/rxjs';
import { Course } from './Course';
import { Section } from './Section';
import { Lesson } from './lesson-detail/Lesson';

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
