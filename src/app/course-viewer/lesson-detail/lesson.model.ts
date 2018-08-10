
export interface LessonData {
    id: string;
    URI: string;
    title: string;
    description: string;
    chunks: any[];
}

export class Lesson {
    id: string;
    URI: string;
    title: string;
    description: string;
    chunks: any[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
