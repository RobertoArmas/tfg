import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



import { CourseData } from '../course-viewer/course.model';
import { Section, SectionData } from '../course-viewer/section.model';
import { LessonData } from '../course-viewer/lesson.model';
import { ApiService } from './api.service';
import { FirebaseApiService } from './firebase-api.service';
import { ChunkData } from '../chunks/chunk.model';

/**
 * Servicio intermediario entre el API REST y la aplicación
 * Los componentes de la aplicación solo pueden obtener datos a través de este servicio.
 */

@Injectable()
export class CourseDataService {
  private courseId = 'c1';

  constructor(private api: ApiService, private firebaseApiService: FirebaseApiService) { }

  getCourseInformation(): Observable<CourseData> {
    return this.firebaseApiService.getCourseInformation(this.courseId);
  }

  getCourseSections(): Observable<SectionData[]> {
    return this.firebaseApiService.getCourseSections(this.courseId);
  }

  getSectionLessons(sectionId: string): Observable<LessonData[]> {
    return this.firebaseApiService.getSectionLessons(this.courseId, sectionId);
  }

  getLessonInformation(sectionId: string, lessonId: string): Observable<LessonData> {
    return this.firebaseApiService.getLessonInformation(this.courseId, sectionId, lessonId);
  }

  getLessonChunks(sectionId: string, lessonId: string): Observable<ChunkData[]> {
    return this.firebaseApiService.getLessonChunks(this.courseId, sectionId, lessonId);
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


  getLesson(lessonId: string): Observable<LessonData> {
    return this.api.getLesson(lessonId);
  }
}
