import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { CourseData } from './course.model';
import { Section } from './section.model';
import { LessonData } from './lesson-detail/lesson.model';

/**
 * Servicio intermediario entre el API REST y la aplicación
 * Los componentes de la aplicación solo pueden obtener datos a través de este servicio.
 */

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {

  constructor(private api: ApiService) { }

  getCourseAttributes(): Observable<CourseData> {
    return this.api.getCourse();
  }

  getAllSections(): Observable<Section[]> {
    return this.api.getAllSections();
  }

  getAllLessons(): Observable<LessonData[]> {
    return this.api.getAllLessons();
  }

  getSectionLessons(sectionId: string): Observable<LessonData[]> {
    return this.api.getSectionLessons(sectionId);
  }

  getLesson(lessonId: string): Observable<LessonData> {
    return this.api.getLesson(lessonId);
  }
}
