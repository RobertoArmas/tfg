import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ChunkDirective } from './chunk.directive';
import { Lesson, LessonData } from '../../lesson.model';
import { CourseDataService } from '../../../core/course-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chunk } from '../../../chunks/chunk.model';
import { XapiService } from '../../../core/xapi/xapi.service';
import { ChunkHeadingComponent } from '../../../chunks/text/chunk-heading/chunk-heading.component';
import { ChunkSubheadingComponent } from '../../../chunks/text/chunk-subheading/chunk-subheading.component';
import { ChunkTextComponent } from '../../../chunks/text/chunk-text/chunk-text.component';
import { ChunkTwoColumnComponent } from '../../../chunks/text/chunk-two-column/chunk-two-column.component';
import { ChunkHeadingTextComponent } from '../../../chunks/text/chunk-heading-text/chunk-heading-text.component';
import { ChunkSubheadingTextComponent } from '../../../chunks/text/chunk-subheading-text/chunk-subheading-text.component';
import { ChunkCheckboxListComponent } from '../../../chunks/interactive/chunk-checkbox-list/chunk-checkbox-list.component';
import { ChunkImageCenteredComponent } from '../../../chunks/image/chunk-image-centered/chunk-image-centered.component';
import { ChunkMultipleChoiceComponent } from '../../../chunks/activity/chunk-multiple-choice/chunk-multiple-choice.component';
import { Section } from '../../section.model';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {

  @ViewChild(ChunkDirective) chunkHost: ChunkDirective;
  currentLesson: Lesson;

  // Id de la lección extraída de la ruta del navegador
  lessonId: string;
  sectionId: string;
  nextLesson: LessonData;
  previousLesson: LessonData;
  currentLessonTrimmed: Lesson;
  isLastLesson: boolean;
  isFirstLesson: boolean;
  currentLessonIndex: number;

  constructor(
    private courseDataService: CourseDataService,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private xapi: XapiService,
    private router: Router
  ) {
    this.nextLesson = new Lesson();
    this.previousLesson = new Lesson();

    // Predicción: esta no es ni la primera ni la última lección
    this.isLastLesson = false;
    this.isFirstLesson = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.lessonId = params['lessonId'];
      this.sectionId = params['sectionId'];
      this.getLessonInformation();
    });
  }

  getLessonInformation() {
    this.courseDataService
      .getLessonInformation(this.sectionId, this.lessonId)
      .subscribe(
        (lesson) => {
          this.currentLesson = lesson;
          this.getLessonChunks();
        }
      );
  }

  getLessonChunks() {
    this.courseDataService
      .getLessonChunks(this.sectionId, this.lessonId)
      .subscribe(
        (chunks) => {
          this.currentLesson.chunks = chunks;

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

  setAroundLessonsIds() {
    this.getAllLessons();
  }

  getAllLessons() {
    this.getCourseSections();
  }

  getCourseSections() {
    const lessonsBundle: LessonData[] = [];

    this.courseDataService
      .getCourseSections()
      .subscribe(
        (sections) => {
          sections.map((section) => {
            this.getSectionLessons(section, lessonsBundle);
          });
        }
      );
  }

  getSectionLessons(section: Section, lessonsBundle: LessonData[]) {
    this.courseDataService
      .getSectionLessons(section.id)
      .subscribe(
        (lessons) => {
          lessons.forEach((lesson) => {
            lessonsBundle.push({ sectionId: section.id, ...lesson });
          });
          this.currentLessonIndex = lessonsBundle.findIndex(
            lesson => lesson.sectionId === this.sectionId && lesson.id === this.lessonId
          );
          this.setNextLesson(this.currentLessonIndex, lessonsBundle);
          this.setPreviousLesson(this.currentLessonIndex, lessonsBundle);
        }
      );
  }

  setNextLesson(currentLessonIndex: number, lessonsBundle: LessonData[]) {
    this.nextLesson = lessonsBundle[currentLessonIndex + 1];
    if (this.nextLesson === undefined) { this.isLastLesson = true; } else { this.isLastLesson = false; }
  }

  setPreviousLesson(currentLessonIndex: number, lessonsBundle: LessonData[]) {
    this.previousLesson = lessonsBundle[currentLessonIndex - 1];
    if (this.previousLesson === undefined) { this.isFirstLesson = true; } else { this.isFirstLesson = false; }
  }

  progressLesson() {
    this.router.navigate(['/course-viewer/section/' + this.nextLesson.sectionId + '/lesson/' + this.nextLesson.id]);
    this.xapi.progressed(this.nextLesson);
  }

  navigateBack() {
    this.router.navigate(['/course-viewer/section/' + this.previousLesson.sectionId + '/lesson/' + this.previousLesson.id]);
    this.xapi.navigatedBack(this.previousLesson);
  }

  loadComponentIntoAnchor(chunkComponent: Chunk) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(chunkComponent.type);
    const viewContainerRef = this.chunkHost.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<Chunk>componentRef.instance).attributes = chunkComponent.attributes;
    (<Chunk>componentRef.instance).id = chunkComponent.id;
    (<Chunk>componentRef.instance).parentLesson = this.currentLesson;
  }


  /**
   * TODO: refactorizar este switch a otra estructura porque se va a hacer mega-mastodóntica
   * por ejemplo un servicio ChunkService que se encargue de devolver el tipo de Chunk a cargar
   */
  createComponentFromJSON(chunkItem): Chunk {
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
      case 'multipleChoice':
        component = ChunkMultipleChoiceComponent;
        break;
      case 'imageCentered':
        component = ChunkImageCenteredComponent;
        break;
      default:
        break;
    }
    return new Chunk(component, chunkItem.attributes, chunkItem.id, chunkItem.parentLesson);
  }

}
