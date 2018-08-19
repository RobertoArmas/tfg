
export interface LessonData {
    id: string;
    sectionId?: string; // Se utiliza solo cuando se establecen los botones 'siguiente lección' y 'lección anterior' de una lección
    URI: string;
    title: string;
    description: string;
    chunks: any[];
}

export class Lesson implements LessonData {
    id: string;
    URI: string;
    title: string;
    description: string;
    chunks: any[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
