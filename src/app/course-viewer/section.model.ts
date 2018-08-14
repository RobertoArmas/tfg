import { LessonData } from './lesson.model';


export interface SectionData {
    id: string;
    title: string;
    lessons: LessonData[];
}

export class Section implements SectionData {
    id: string;
    title: string;
    lessons: LessonData[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
