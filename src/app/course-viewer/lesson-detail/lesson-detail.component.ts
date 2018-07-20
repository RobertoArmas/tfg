import { Component, OnInit, ViewChild, ComponentFactoryResolver, Type } from '@angular/core';
import { Lesson } from './Lesson';
import { CourseDataService } from '../course-data.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ChunkDirective } from './chunk-directive.directive';
import { ChunkHeadingComponent } from '../../common/text/chunk-heading/chunk-heading.component';
import { ChunkComponent } from '../../common/ChunkComponent';
import { ChunkTextComponent } from '../../common/text/chunk-text/chunk-text.component';
import { ChunkSubheadingComponent } from '../../common/text/chunk-subheading/chunk-subheading.component';
import { ChunkTwoColumnComponent } from '../../common/text/chunk-two-column/chunk-two-column.component';
import { ChunkHeadingTextComponent } from '../../common/text/chunk-heading-text/chunk-heading-text.component';
import { ChunkSubheadingTextComponent } from '../../common/text/chunk-subheading-text/chunk-subheading-text.component';
import { ChunkCheckboxListComponent } from '../../common/interactive/chunk-checkbox-list/chunk-checkbox-list.component';
import { XapiService } from '../../xapi.service';

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
  nextLessonTrimmed: Lesson;
  previousLessonTrimmed: Lesson;
  isLastLesson: boolean;
  isFirstLesson: boolean;

  constructor(
    private courseDataService: CourseDataService,
    private route: ActivatedRoute,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private xapi: XapiService
  ) {
    this.nextLessonTrimmed = new Lesson();
    this.previousLessonTrimmed = new Lesson();

    // Predicción: esta no es ni la primera ni la última lección
    this.isLastLesson = false;
    this.isFirstLesson = false;
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
        this.setAroundLessonsIds();
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
   * TODO: buscar una forma más eficiente de capturar las lecciones anterior y siguiente
   * (no teniendo que volver a traer los datos de todas las lecciones)
   */
  setAroundLessonsIds() {
    this.courseDataService.getAllLessons()
      .subscribe(
        (lessons) => {
          const currentLessonIndex = lessons.findIndex(lesson => lesson.id === this.id);
          this.setNextLesson(lessons, currentLessonIndex);
          this.setPreviousLesson(lessons, currentLessonIndex);
        }
      );
  }

  // Se necesitan todos los datos de la siguiente lección para enviar el report a xAPI
  setNextLesson(lessons: Lesson[], currentLessonIndex: number) {
    try {
      this.nextLessonTrimmed.id = lessons[currentLessonIndex + 1].id;
      this.nextLessonTrimmed.title = lessons[currentLessonIndex + 1].title;
      if (this.isLastLesson) { this.isLastLesson = false; }
    } catch (noNextIndexError) {
      this.isLastLesson = true;
    }
  }

  // Se necesitan todos los datos de la lección anterior para enviar el report a xAPI
  setPreviousLesson(lessons: Lesson[], currentLessonIndex: number) {
    try {
      this.previousLessonTrimmed.id = lessons[currentLessonIndex - 1].id;
      this.previousLessonTrimmed.title = lessons[currentLessonIndex - 1].title;
      if (this.isFirstLesson) { this.isFirstLesson = false; }
    } catch (noPreviousIndexError) {
      this.isFirstLesson = true;
    }
  }

  loadComponentIntoAnchor(chunkComponent: ChunkComponent) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(chunkComponent.type);
    const viewContainerRef = this.chunkHost.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<ChunkComponent>componentRef.instance).attributes = chunkComponent.attributes;
  }

  progressLesson() {
    const lessonInfo: string = this.nextLessonTrimmed.id + ' - ' + this.nextLessonTrimmed.title;
    this.xapi.progressed(lessonInfo);
  }

  navigateBack() {
    const previousLessonInfo: string = this.previousLessonTrimmed.id + ' - ' + this.previousLessonTrimmed.title;
    this.xapi.navigateBack(previousLessonInfo);
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
