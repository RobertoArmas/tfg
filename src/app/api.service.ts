import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Course } from '../assets/data/classes/course';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: Http ) { }

  // API: GET /course
  public getCourse(): Observable<any[]> {
    return this.http
      .get(API_URL + '/course')
      .map(response => {
        const course = response.json();
        return course.map((course) => new Course(course));
      });
  }
}
