import { Section } from './Section';

export class Course {
    id: string;
    URI: string;
    title: string;
    description: string;
    sections: Section[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
