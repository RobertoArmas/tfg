import { Lesson } from '../course-viewer/lesson-detail/Lesson';

export class ChunkComponent {
  constructor(public type: any, public attributes: any, public id: string, public parentLesson: Lesson) {}
}
