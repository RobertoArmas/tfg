import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseDataService } from '../course-data.service';


/**
 * Redirecciona por defecto a la primera lección del curso.
 *
 * Se ha creado un Component para hacer esto por si en futuras ampliaciones se quiere mostrar algo en una
 * página previa a la primera lección que solo sea accesible la primera vez que se accede al curso desde Welcome.
 */
@Component({
  templateUrl: './course-viewer-home.component.html'
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
