import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



import { CourseData } from '../course-viewer/course.model';
import { Section } from '../course-viewer/section.model';
import { LessonData } from '../course-viewer/lesson.model';
import { ApiService } from './api.service';
import { FirebaseApiService } from './firebase-api.service';

/**
 * Servicio intermediario entre el API REST y la aplicación
 * Los componentes de la aplicación solo pueden obtener datos a través de este servicio.
 */

@Injectable()
export class CourseDataService {
  private courseId = '3uKy1rPWk6OB8w0FART7';

  constructor(private api: ApiService, private firebaseApiService: FirebaseApiService) { }

  getCourseInformation(): Observable<any> {
    return this.firebaseApiService.getCourseInformation(this.courseId);
  }

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
