export class Statement {
    actor: StatementAgent;
    object?: StatementObject;
    context?: StatementContext;
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

class StatementAgent implements Object {
    mbox: string;
}

class StatementObject {
    id: string;
    definition: ObjectDefinition;
    objectType: string;
}

class ObjectDefinition {
    name: Object;
    description: Object;
    type: string;
}

class StatementContext {
    registration?: string;
}
