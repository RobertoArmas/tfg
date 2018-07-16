import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Course } from '../assets/data/classes/course';
import { Observable } from 'rxjs';
import { Lesson } from '../assets/data/classes/lesson';
import { Section } from '../assets/data/classes/section';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {

  constructor(private api: ApiService) { }

  // getCourse(): Observable<Course> {
  //   return this.api.getCourse();
  // }

  getCourseAttributes(): Observable<Course> {
    return this.api.getCourse();
  }

  getAllSections(): Observable<Section[]> {
    return this.api.getAllSections();
  }

  getAllLessons(): Observable<Lesson[]> {
    return this.api.getAllLessons();
  }

}
