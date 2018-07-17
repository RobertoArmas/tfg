import { Section } from './Section';

export class Course {
    id: string;
    title: string;
    sections: Section[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
