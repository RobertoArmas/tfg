export class Statement {
    actor: Agent;
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

class Agent implements Object {
    mbox: string;
}
