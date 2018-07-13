import { Section } from './section';

export class Course {
    id: string;
    title: string;
    sections: Section[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
