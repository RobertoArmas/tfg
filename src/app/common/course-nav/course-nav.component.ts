import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-course-nav',
  templateUrl: './course-nav.component.html',
  styleUrls: ['./course-nav.component.css']
})
export class CourseNavComponent implements OnInit {
  course: any;
  error: any;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getConfig()
      .subscribe(
        (data: any) => this.course = { ...data },
        error => this.error = error
      );
  }
}
