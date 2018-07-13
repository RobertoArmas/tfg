import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseUrl = 'assets/data/demo.course.json';

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get(this.courseUrl);
  }
}
