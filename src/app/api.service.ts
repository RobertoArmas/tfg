import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Course } from '../assets/data/classes/course';

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

  handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
