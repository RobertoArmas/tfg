export class Statement {
    actor?: any;
    object?: any;
    context?: any;
    verb?: StatementVerb;
    timestamp?: any;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

class StatementVerb {
    id: string;
    display: Object;
}
