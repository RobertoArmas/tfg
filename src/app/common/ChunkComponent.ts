import { LessonData } from '../course-viewer/lesson-detail/lesson.model';

export class ChunkComponent {
  constructor(public type: any, public attributes: any, public id: string, public parentLesson: LessonData) {}
}
