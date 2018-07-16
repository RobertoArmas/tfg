import { Component, OnInit, ViewChild, ComponentFactoryResolver, Type } from '@angular/core';
import { Lesson } from '../../../assets/data/classes/lesson';
import { CourseDataService } from '../../course-data.service';
import { ActivatedRoute } from '@angular/router';
import { ChunkDirective } from './chunk-directive.directive';
import { ChunkHeadingComponent } from '../../common/text/chunk-heading/chunk-heading.component';
import { ChunkComponent } from '../../../assets/data/classes/chunkComponent';
import { ComponentDef } from '../../../../node_modules/@angular/core/src/render3';
import { ComponentType } from '../../../../node_modules/@angular/cdk/portal';
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
            const viewContainerRef = this.chunkHost.viewContainerRef;
            viewContainerRef.clear();
            for (let chunk of this.lesson.chunks) {
              let chunkComponent = this.createComponent(chunk);
              this.loadComponent(chunkComponent);
            }
          }
        );
    });
  }

  createComponent(chunkItem): ChunkComponent {
    let component: any;
    switch (chunkItem.type) {
      case 'ChunkHeadingComponent':
        component = ChunkHeadingComponent;
        break;
      case 'text':
        component = ChunkTextComponent;
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
}
