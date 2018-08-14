import { LessonData } from '../course-viewer/lesson.model';

export interface ChunkData {
    paddingTop: number;
    paddingBottom: number;
    backgroundColor: string;
    statementData: string;
    reviewed: boolean;
}

export class Chunk {
    constructor(public type: any, public attributes: any, public id: string, public parentLesson: LessonData) {}
  }
