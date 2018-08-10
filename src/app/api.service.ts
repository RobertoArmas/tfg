import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Lesson } from './course-viewer/lesson-detail/Lesson';
import { Section } from './course-viewer/Section';
import { Course } from './course-viewer/course.model';

/**
 * API REST de conexión con el backend
 * Ref: https://www.sitepoint.com/angular-rxjs-create-api-service-rest-backend/
 */

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: Http ) { }

  public getCourse(): Observable<Course> {
    return this.http
      .get(API_URL + '/course')
      .pipe(
        map(response => {
          const course = response.json();
          return new Course(course);
        }),
        catchError(this.handleError)
      );
  }

  public getAllSections(): Observable<Section[]> {
    return this.http
      .get(API_URL + '/sections')
      .pipe(
        map(response => {
          const sections = response.json();
          return sections.map((section) => new Section(section));
        }),
        catchError(this.handleError)
      );
  }

  public getAllLessons(): Observable<Lesson[]> {
    return this.http
      .get(API_URL + '/lessons')
      .pipe(
        map(response => {
          const lessons = response.json();
          return lessons.map((lesson) => new Lesson(lesson));
        }),
        catchError(this.handleError)
      );
  }

  public getSectionLessons(sectionId: string): Observable<Lesson[]> {
    return this.http
      .get(API_URL + '/lessons?sectionId=' + sectionId)
      .pipe(
        map(response => {
          const lessons = response.json();
          return lessons.map((lesson) => new Lesson(lesson));
        }),
        catchError(this.handleError)
      );
  }

  public getLesson(lessonId): Observable<Lesson> {
    return this.http
      .get(API_URL + '/lessons?id=' + lessonId)
      .pipe(
        map(response => {
          const lesson = response.json();
          return new Lesson(lesson);
        }),
        catchError(this.handleError)
      );
  }


  handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
