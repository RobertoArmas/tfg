import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../course-data.service';
import { Course } from '../Course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  course: Course = new Course();
  constructor(private courseDataService: CourseDataService) { }

  ngOnInit() {}

}
