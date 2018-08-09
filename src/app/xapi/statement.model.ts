
export interface Statement {
    actor?: any;
    object?: any;
    context?: any;
    verb?: StatementVerb;
    timestamp?: any;
    result?: any;
}

export interface StatementVerb {
    id: string;
    display: Object;
}
