
export class MultipleChoice implements Chunk {
    question: string;
    statementData: string;
    choices: string[];
    rightChoice: number;
    answeredChoice: number;
    feedback: string;

    paddingTop: number;
    paddingBottom: number;
    backgroundColor: string;
    reviewed: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    isAnswered(): boolean {
        if (this.answeredChoice !== null && this.answeredChoice >= 0) {
            return true;
        }
        return false;
    }
}
