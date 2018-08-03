export class Statement {
    actor: StatementAgent;
    object?: Activity;
    context?: StatementContext;
    verb?: StatementVerb;
    timestamp?: Date;

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

class Activity {
    // An identifier for a single unique Activity
    id: IRI;

    // Metadata (see ActivityDefinitionObject)
    definition?: ActivityDefinitionObject;

    // MUST be Activity when present
    objectType?: string;
}

class ActivityDefinitionObject {
    // The human readable/visual name of the Activity
    name: LanguageMap;

    // A description of the Activity
    description: LanguageMap;

    // The type of Activity.
    type: IRI;

    // Resolves to a document with human-readable information about the Activity, which could include a way to launch the activity.
    moreInfo?: IRL;

    // A map of other properties as needed (see: https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#miscext)
    extensions?: Object;
}

class StatementContext {
    registration?: string;
    contextActivities?: ContextActivitiesObject;
}

class ContextActivitiesObject {
    parent?: Activity | Activity[];
    grouping?: Activity | Activity[];
    category?: Activity | Activity[];
    other?: Activity | Activity[];
}

class IRI extends String {}

class IRL extends String {}

class LanguageMap implements Object {}
