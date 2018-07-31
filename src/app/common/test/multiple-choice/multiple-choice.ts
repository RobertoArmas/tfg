
export class MultipleChoice implements Chunk {
    question: string;
    choices: string[];
    rightChoice: number;
    feedback: string;
    paddingTop: number;
    paddingBottom: number;
    backgroundColor: string;
    reviewed: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
