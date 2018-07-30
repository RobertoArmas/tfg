import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Course } from './Course';
import { Section } from './Section';
import { Lesson } from './lesson-detail/Lesson';

/**
 * Servicio intermediario entre el API REST y la aplicación
 * Los componentes de la aplicación solo pueden obtener datos a través de este servicio.
 */

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
