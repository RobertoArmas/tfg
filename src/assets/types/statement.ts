export class Statement {
    actor: StatementAgent;
    object?: Activity;
    context?: StatementContext;
    verb?: StatementVerb;
    timestamp?: Date;
    result?: ResultObject;

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

    // The type of interaction.
    interactionType?: string;

    // A pattern representing the correct response to the interaction. 
    // The structure of this pattern varies depending on the interactionType.
    correctResponsesPattern?: string[];

    choices?: any;
}

class StatementContext {

    // The registration that the Statement is associated with.
    registration?: UUID;

    // A map of the types of learning activity context that this Statement is related to.
    contextActivities?: ContextActivitiesObject;
}

class ContextActivitiesObject {
    parent?: Activity | Activity[];
    grouping?: Activity | Activity[];
    category?: Activity | Activity[];
    other?: Activity | Activity[];
}

class ResultObject {

    // The score of the Agent in relation to the success or quality of the experience. 
    // See: https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#Score
    score?: Object;

    // Indicates whether or not the attempt on the Activity was successful.
    success?: boolean;

    // Indicates whether or not the Activity was completed.
    completion?: boolean;

    // A response appropriately formatted for the given Activity.
    response?: string;

    // Period of time over which the Statement occurred.
    // For type see: https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#durations
    duration?: any;

    // A map of other properties as needed.
    // See: https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#miscext
    extensions?: Object;
}

class IRI extends String {}

class IRL extends String {}

class UUID extends String {}

class LanguageMap implements Object {}
