/**
 * Todas las interfaces de este documento están creadas en base a la especificación xAPI
 * Ver: https://github.com/adlnet/xAPI-Spec
 */

export interface Statement {
    actor?: StatementAgent;
    object?: StatementActivity;
    context?: StatementContext;
    verb?: StatementVerb;
    timestamp?: Date;
    result?: StatementResult;
    authority?: StatementAuthority;
}

export interface StatementAuthority {
    mbox?: string;
    objectType?: string;
    name?: string;
}
export interface StatementVerb {
    id: string;
    display: LanguageMap;
}

export interface StatementAgent {
    objectType?: string;
    name?: string;
    mbox?: string;
    mbox_sha1sum?: string;
    openid?: string;
    account?: Object;
}

export interface StatementActivity {
    // An identifier for a single unique Activity
    id: IRI;

    // Metadata (see ActivityDefinitionObject)
    definition?: ActivityDefinition;

    // MUST be Activity when present
    objectType?: string;
}

interface ActivityDefinition {

    // The human readable/visual name of the Activity
    name: LanguageMap | any;

    // A description of the Activity
    description: LanguageMap | any ;

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

interface StatementContext {

    // The registration that the Statement is associated with.
    registration?: UUID;

    // A map of the types of learning activity context that this Statement is related to.
    contextActivities?: ContextActivities;
}

interface ContextActivities {
    parent?: StatementActivity | StatementActivity[];
    grouping?: StatementActivity | StatementActivity[];
    category?: StatementActivity | StatementActivity[];
    other?: StatementActivity | StatementActivity[];
}

interface StatementResult {

    // The score of the Agent in relation to the success or quality of the experience.
    // See: https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#Score
    score?: Object;

    // Indicates whether or not the attempt on the Activity was successful.
    success?: boolean;

    // Indicates whether or not the Activity was completed.
    completion?: boolean;

    // A response appropriately formatted for the given Activity.
    response?: string | string[];

    // Period of time over which the Statement occurred.
    // For type see: https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#durations
    duration?: any;

    // A map of other properties as needed.
    // See: https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#miscext
    extensions?: Object;
}

interface IRI extends String {}

interface IRL extends String {}

interface UUID extends String {}

interface LanguageMap extends Object {}
