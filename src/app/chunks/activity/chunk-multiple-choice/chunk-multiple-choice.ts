import { ChunkData } from '../../chunk.model';

export class ChunkMultipleChoice implements ChunkData {
    question: string;
    statementData: string;
    interactionType: string;
    choices: string[];
    correctResponsePattern: string[];
    feedback: string;
    statementChoices: Object[];
    statementSuccess: boolean;
    statementResponse: string;
    previousAttempts: number;

    paddingTop: number;
    paddingBottom: number;
    backgroundColor: string;
    reviewed: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
