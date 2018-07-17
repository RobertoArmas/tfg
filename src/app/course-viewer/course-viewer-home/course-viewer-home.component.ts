import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { CourseDataService } from '../../course-data.service';

@Component({
  selector: 'app-course-viewer-home',
  templateUrl: './course-viewer-home.component.html',
  styleUrls: ['./course-viewer-home.component.css']
})
export class CourseViewerHomeComponent implements OnInit {
  firstLessonId: string;

  constructor(private router: Router, private coursedataService: CourseDataService) { }

  ngOnInit() {
    this.coursedataService.getAllLessons().subscribe(
      (lessons) => {
        this.firstLessonId = lessons[0].id;
        this.router.navigate(['/course/' + this.firstLessonId]);
      }
    );
  }

}
