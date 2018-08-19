import { Statement } from '../core/xapi/statement.model';
import { SafeStyle } from '@angular/platform-browser';


export interface CourseData {
    id: string;

    title: string;

    description: string;

    URI: string;

    imageUrl: string | SafeStyle;

    setData: (data: CourseData) => void;
}

export class Course implements CourseData {

    id: string;

    title: string;

    description: string;

    // Todos los elementos del curso tienen como base esta URI
    URI: string;

    baseStatement?: Statement;

    // GUID de la sesión del curso que se ha lanzado
    attemptGUID?: string;

    imageUrl: string | SafeStyle;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }


    setData(data: CourseData): void {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.URI = data.URI;
    }
}
