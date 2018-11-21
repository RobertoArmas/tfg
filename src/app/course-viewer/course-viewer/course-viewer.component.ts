import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from 'src/app/core/progress.service';

@Component({
  selector: 'app-course-viewer',
  templateUrl: './course-viewer.component.html',
  styleUrls: ['./course-viewer.component.scss']
})
export class CourseViewerComponent implements OnInit {

  startSidenavOpen: boolean;
  endSidenavOpen: boolean;


  constructor(
    private router: Router,
    private progressStore: ProgressService
    ) {
    this.startSidenavOpen = false;
    this.endSidenavOpen = false;
  }

  ngOnInit() {
    this.subscribeToRouteChanges();
    this.redirectToCurrentUserLesson();
  }

  toggleStartSidenav() {
    this.startSidenavOpen = !this.startSidenavOpen;
  }

  toggleEndSidenav() {
    this.endSidenavOpen = !this.endSidenavOpen;
  }

  // Devuelve el modo en el que se abre el sidenav en función del tamaño de pantalla
  isLargeScreen(): string {
    // Tipo de widths según dispositivo
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 1280) {
      return 'side';
    } else {
      return 'push';
    }
  }

  /**
   * Hace scroll al principio de la lección cuando se cambia de ruta (siguiente, anterior o desde el sidenav)
   * No se muy bien por qué hay que poner un Timeout, pero si se quita no funciona.
   */
  subscribeToRouteChanges() {
    this.router.events.subscribe(() => {
      setTimeout(() => {
        try {
          window.scroll({ top: 70, left: 0, behavior: 'smooth' });
        } catch (error) {
          window.scroll({ top: 70, left: 0, behavior: 'smooth' });
        }
      }, 300);
    });
  }
 
  redirectToCurrentUserLesson() {
    this.progressStore.progress.subscribe(
      progress => {
        if(!progress) {
          this.progressStore.createUserProgress();
        } else {
          this.router.navigate(['/course-viewer/section/' + progress.currentLesson.sectionId + 
          '/lesson/' + progress.currentLesson.lessonId]);
        }
      }
    );
  }

}
