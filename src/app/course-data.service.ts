import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Course } from '../assets/data/classes/course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {

  constructor(private api: ApiService) { }

  getCourse(): Observable<Course> {
    return this.api.getCourse();
  }
}
