import { Lesson } from './lesson-detail/Lesson';

export interface SectionData {
    id: string;
    title: string;
    lessons: Lesson[];
}

export class Section implements SectionData {
    id: string;
    title: string;
    lessons: Lesson[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
