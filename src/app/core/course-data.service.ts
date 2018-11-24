import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



import { CourseData } from '../course-viewer/course.model';
import { Section, SectionData } from '../course-viewer/section.model';
import { LessonData } from '../course-viewer/lesson.model';
import { FirebaseApiService } from './firebase-api.service';
import { ChunkData } from '../chunks/chunk.model';
import { combineAll } from 'rxjs/operators';

/**
 * Servicio intermediario entre el API REST y la aplicación
 * Los componentes de la aplicación solo pueden obtener datos a través de este servicio.
 */

@Injectable()
export class CourseDataService {
  private _courseId = 'c1';
  public get courseId() {
    return this._courseId;
  }
  public set courseId(value) {
    this._courseId = value;
  }

  constructor(private fbsApiService: FirebaseApiService) { }

  getCourseInformation(): Observable<CourseData> {
    return this.fbsApiService.getCourseInformation(this.courseId);
  }

  getCourseSections(): Observable<SectionData[]> {
    return this.fbsApiService.getCourseSections(this.courseId);
  }

  getSectionLessons(sectionId: string): Observable<LessonData[]> {
    return this.fbsApiService.getSectionLessons(this.courseId, sectionId);
  }

  getLessonInformation(sectionId: string, lessonId: string): Observable<LessonData> {
    return this.fbsApiService.getLessonInformation(this.courseId, sectionId, lessonId);
  }

  getLessonChunks(sectionId: string, lessonId: string): Observable<ChunkData[]> {
    return this.fbsApiService.getLessonChunks(this.courseId, sectionId, lessonId);
  }
  
  getLessonsArray(): any {
    return this.fbsApiService.getLessonsArray();
  }
}
