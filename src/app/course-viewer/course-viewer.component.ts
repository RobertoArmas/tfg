import { Component, OnInit } from '@angular/core';
import { ChildInteractionService } from '../child-interaction.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * Contenedor de las vistas de presentación del curso
 */

@Component({
  templateUrl: './course-viewer.component.html',
  styleUrls: ['./course-viewer.component.css']
})
export class CourseViewerComponent implements OnInit {
  startSidenavOpen: boolean;
  endSidenavOpen: boolean;
  startSidenavSubscription: Subscription;
  endSidenavSubscription: Subscription;


  constructor(private childInteractionService: ChildInteractionService, private router: Router) {
    this.startSidenavOpen = true;
    this.endSidenavOpen = false;

    this.startSidenavSubscription = childInteractionService.sartSidenavToggled$.subscribe(
      toggle => this.startSidenavOpen = !this.startSidenavOpen
    );
    this.endSidenavSubscription = childInteractionService.endSidenavToggled$.subscribe(
      toggle => this.endSidenavOpen = !this.endSidenavOpen
    );
  }

  ngOnInit() {
    this.subscribeToRouteChanges();
  }

  /**
   * Hace scroll al principio de la lección cuando se cambia de ruta (siguiente, anterior o desde el sidenav)
   * No se muy bien por qué hay que poner un Timeout, pero si se quita no funciona.
   */
  subscribeToRouteChanges() {
    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      const contentContainer = document.querySelector('.mat-sidenav-content');
      if (contentContainer) {
        setTimeout(() => {
          document.querySelector('.mat-sidenav-content').scroll({ top: 70, left: 0, behavior: 'smooth' });
        } , 100);
      } else {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        console.log('rollme');
      }
    });
  }
}
