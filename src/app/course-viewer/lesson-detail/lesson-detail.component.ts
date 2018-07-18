import { Component, OnInit, ViewChild, ComponentFactoryResolver, Type } from '@angular/core';
import { Lesson } from './Lesson';
import { CourseDataService } from '../course-data.service';
import { ActivatedRoute } from '@angular/router';
import { ChunkDirective } from './chunk-directive.directive';
import { ChunkHeadingComponent } from '../../common/text/chunk-heading/chunk-heading.component';
import { ChunkComponent } from '../../common/ChunkComponent';
import { ChunkTextComponent } from '../../common/text/chunk-text/chunk-text.component';
import { ChunkSubheadingComponent } from '../../common/text/chunk-subheading/chunk-subheading.component';
import { ChunkTwoColumnComponent } from '../../common/text/chunk-two-column/chunk-two-column.component';
import { ChunkHeadingTextComponent } from '../../common/text/chunk-heading-text/chunk-heading-text.component';
import { ChunkSubheadingTextComponent } from '../../common/text/chunk-subheading-text/chunk-subheading-text.component';
import { ChunkCheckboxListComponent } from '../../common/interactive/chunk-checkbox-list/chunk-checkbox-list.component';

/**
 * Se encarga de renderizar los componentes de los Chunks de cada lección
 */

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {
  @ViewChild(ChunkDirective) chunkHost: ChunkDirective;
  currentLesson: Lesson;

  // Id de la lección extraída de la ruta del navegador
  id: string;
  nextLessonId: string;
  isLastLesson: boolean;

  constructor(
    private courseDataService: CourseDataService,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    // Predicción: esta no es la última lección
    this.isLastLesson = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getLessonData();
    });
  }

  getLessonData() {
    this.courseDataService
    .getLesson(this.id)
    .subscribe(
      (lesson) => {
        this.currentLesson = lesson[0];

        // Hasta que no se han obtenido los datos de la lección no se pueden crear los componentes dinámicamente
        this.clearViewContainerRef();
        this.createDynamicComponents();
        this.setNextLessonId();
      }
    );
  }

  // Necesario para que no se queden los Chunks de la lección anterior en la vista
  clearViewContainerRef() {
    this.chunkHost.viewContainerRef.clear();
  }

  createDynamicComponents() {
    for (const chunk of this.currentLesson.chunks) {
      const chunkComponent = this.createComponentFromJSON(chunk);
      this.loadComponentIntoAnchor(chunkComponent);
    }
  }

  /**
   * TODO: buscar una forma más eficiente de capturar la siguiente lección
   * (no teniendo que volver a traer los datos de todas las lecciones)
   */
  setNextLessonId() {
    this.courseDataService.getAllLessons()
      .subscribe(
        (lessons) => {
          const currentLessonIndex = lessons.findIndex(lesson => lesson.id === this.id);
          try {
            this.nextLessonId = lessons[currentLessonIndex + 1].id;
            if (this.isLastLesson) { this.isLastLesson = false; }
          } catch (noNextIndexError) {
            this.isLastLesson = true;
          }
        }
      );
  }

  loadComponentIntoAnchor(chunkComponent: ChunkComponent) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(chunkComponent.type);
    const viewContainerRef = this.chunkHost.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<ChunkComponent>componentRef.instance).attributes = chunkComponent.attributes;
  }

  /**
   * TODO: refactorizar este switch a otra estructura porque se va a hacer mega-mastodóntica
   */
  createComponentFromJSON(chunkItem): ChunkComponent {
    let component: any;
    switch (chunkItem.type) {
      case 'heading':
        component = ChunkHeadingComponent;
        break;
      case 'subheading':
        component = ChunkSubheadingComponent;
        break;
      case 'text':
        component = ChunkTextComponent;
        break;
      case 'twoColumn':
        component = ChunkTwoColumnComponent;
        break;
      case 'headingText':
        component = ChunkHeadingTextComponent;
        break;
      case 'subheadingText':
        component = ChunkSubheadingTextComponent;
        break;
      case 'checkboxList':
        component = ChunkCheckboxListComponent;
        break;
      default:
        break;
    }
    return new ChunkComponent(component, chunkItem.attributes);
  }
}
