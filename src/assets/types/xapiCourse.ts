import { Statement } from './statement';

export class XapiCourse {
    baseuri: string;
    baseStatement: Statement;
    attemptGUID: any;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
