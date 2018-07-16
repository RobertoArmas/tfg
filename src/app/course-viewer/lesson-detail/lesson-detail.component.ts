import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Lesson } from '../../../assets/data/classes/lesson';
import { Course } from '../../../assets/data/classes/course';
import { CourseDataService } from '../../course-data.service';
import { ActivatedRoute } from '@angular/router';
import { ChunkDirective } from './chunk-directive.directive';
import { ChunkHeadingComponent } from '../../common/text/chunk-heading/chunk-heading.component';
import { Basic } from '../../../assets/data/classes/chunks/basic';
import { ChunkComponent } from '../../../assets/data/classes/chunkComponent';
import { ChunkTextComponent } from '../../common/text/chunk-text/chunk-text.component';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {
  @ViewChild(ChunkDirective) chunkHost: ChunkDirective;
  lesson: Lesson;
  id: string;

  constructor(
    private courseDataService: CourseDataService,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.courseDataService
      .getLesson(this.id)
      .subscribe(
        (lesson) => {
          this.lesson = lesson[0];
          this.createComponent(this.lesson.chunks[0]);
          // this.loadComponent(this.lesson.chunks[0]);
        }
      );
    });
  }

  createComponent(chunkItem) {
    console.log(chunkItem);
    return new ChunkComponent(chunkItem.type, {});
  }


  // TODO: Genealizar esto
  loadComponent(chunkComponent: any) {
    // tslint:disable-next-line:no-unused-expression
    // const chunkItem: any = new ChunkItem(ChunkHeadingComponent, {data: 'Introduction to dynamic components'});
    console.log(chunkComponent);


    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(chunkItem.component);
    const viewContainerRef = this.chunkHost.viewContainerRef;

    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    // tslint:disable-next-line:no-unused-expression
    (<ChunkComponent>componentRef.instance).attributes = chunkItem.attributes;
  }
}
