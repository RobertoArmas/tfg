import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ChunkDirective } from './chunk.directive';
import { Lesson, LessonData } from '../../lesson.model';
import { CourseDataService } from '../../../core/course-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chunk } from '../../../chunks/chunk.model';
import { XapiService } from '../../../core/xapi/xapi.service';
import { Section } from '../../section.model';
import { ProgressService } from 'src/app/core/progress.service';
import { ChunkService } from 'src/app/chunks/chunk.service';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {

  @ViewChild(ChunkDirective) chunkHost: ChunkDirective;
  currentLesson: Lesson;
  lessonId: string;
  sectionId: string;
  nextLesson: LessonData = new Lesson();
  previousLesson: LessonData = new Lesson();
  currentLessonTrimmed: Lesson;
  currentLessonIndex: number;
  isLastLesson: boolean = false;
  isFirstLesson: boolean = false;
  isComplete$: boolean = false;

  constructor(
    private courseDataService: CourseDataService,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private xapi: XapiService,
    private router: Router,
    private progressStore: ProgressService,
    private chunkStore: ChunkService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.lessonId = params['lessonId'];
      this.sectionId = params['sectionId'];
      this.getLessonInformation();
    });

    this.progressStore.checkLessonCompletion().subscribe(
      isComplete => {
        this.isComplete$ = isComplete;
      }
    )
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
      const chunkComponent = this.chunkStore.createComponentFromJSON(chunk);
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
    this.progressStore.updateProgress(this.lessonId, this.sectionId, this.nextLesson);

    // Si se quita esta linea no se navega a través del botón cuando ya se ha desbloqueado la lección
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

    // Se crea una ID completa del Chunk para poder gestionar las respuestas en Firebase
    (<Chunk>componentRef.instance).id = this.sectionId + this.lessonId + chunkComponent.id;
    (<Chunk>componentRef.instance).parentLesson = this.currentLesson;
  }
}
