import { Component, OnInit, ViewChild, ComponentFactoryResolver, Type } from '@angular/core';
import { Lesson } from './Lesson';
import { CourseDataService } from '../../course-data.service';
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

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {
  @ViewChild(ChunkDirective) chunkHost: ChunkDirective;
  lesson: Lesson;
  id: string;
  nextLessonId: string;
  isLastLesson: boolean;

  constructor(
    private courseDataService: CourseDataService,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.isLastLesson = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.courseDataService
        .getLesson(this.id)
        .subscribe(
          (lesson) => {
            this.lesson = lesson[0];
            const viewContainerRef = this.chunkHost.viewContainerRef;
            viewContainerRef.clear();
            for (const chunk of this.lesson.chunks) {
              const chunkComponent = this.createComponent(chunk);
              this.loadComponent(chunkComponent);
            }
            this.setNextLessonId();
          }
        );
    });
  }

  createComponent(chunkItem): ChunkComponent {
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




  loadComponent(chunkComponent: ChunkComponent) {
    // chunkComponent = new ChunkComponent(ChunkHeadingComponent, {data: 'Introduction to dynamic components'});
    // console.log(chunkComponent);


    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(chunkComponent.type);
    const viewContainerRef = this.chunkHost.viewContainerRef;

    // viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    // tslint:disable-next-line:no-unused-expression
    (<ChunkComponent>componentRef.instance).attributes = chunkComponent.attributes;
  }

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
}
