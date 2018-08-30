import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-course-viewer',
  templateUrl: './course-viewer.component.html',
  styleUrls: ['./course-viewer.component.css']
})
export class CourseViewerComponent implements OnInit {

  startSidenavOpen: boolean;
  endSidenavOpen: boolean;


  constructor( private router: Router) {
    this.startSidenavOpen = false;
    this.endSidenavOpen = false;
  }

  ngOnInit() {
    this.subscribeToRouteChanges();
  }

  toggleStartSidenav() {
    this.startSidenavOpen = !this.startSidenavOpen;
  }

  toggleEndSidenav() {
    this.endSidenavOpen = !this.endSidenavOpen;
  }

  /**
   * Hace scroll al principio de la lección cuando se cambia de ruta (siguiente, anterior o desde el sidenav)
   * No se muy bien por qué hay que poner un Timeout, pero si se quita no funciona.
   */
  subscribeToRouteChanges() {
    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd)
    ).subscribe(() => {
        setTimeout(() => {
          try {
            window.scroll({ top: 70, left: 0, behavior: 'smooth' });
          } catch (error) {
            window.scroll({ top: 70, left: 0, behavior: 'smooth' });
          }
        } , 350);
    });
  }

}
