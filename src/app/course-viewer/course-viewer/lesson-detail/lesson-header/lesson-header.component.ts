import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ProgressService } from 'src/app/core/progress.service';
import { CourseDataService } from 'src/app/core/course-data.service';
import { zip, combineAll, merge, mergeAll, toArray } from 'rxjs/operators';
import { combineChanges } from 'angularfire2/firestore';

@Component({
  selector: 'app-lesson-header',
  templateUrl: './lesson-header.component.html',
  styleUrls: ['./lesson-header.component.scss']
})
export class LessonHeaderComponent implements OnChanges {

  @Input() lessonId: string = 'Undefined';
  @Input() sectionId: string = 'Undefined';
  @Input() title: string = 'Undefined';

  private mergedId: string;
  currentLesson = 0;
  totalLessons = 0;
  lessonsArray: string[] = [];

  constructor(
    private courseStore: CourseDataService,
    private progressStore: ProgressService
  ) {  }



  ngAfterViewInit() {
    this.setCurrentLessonOfTotal();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setCurrentLessonIndex();
  }

  setCurrentLessonOfTotal() {
    this.courseStore.getLessonsArray()
    .subscribe(
      lessons => {
        this.lessonsArray.push(lessons);
        this.totalLessons = this.lessonsArray.length;
        this.progressStore.totalLessons$ = this.lessonsArray.length;
        this.setCurrentLessonIndex();
      }
    );
  }

  setCurrentLessonIndex() {
    this.currentLesson = this.lessonsArray.indexOf(this.sectionId + this.lessonId) + 1;
  }

}
