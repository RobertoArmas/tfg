import { Statement } from './statement';

export class XapiCourse {
    baseuri: string;
    statement: Statement;
    attemptGUID: any;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
