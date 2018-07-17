import { Lesson } from './lesson-detail/Lesson';

export class Section {
    id: string;
    title: string;
    lessons: Lesson[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
