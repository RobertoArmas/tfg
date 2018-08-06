export class TwoCol implements Chunk {
    dataCol1: string;
    dataCol2: string;
    statementData: string;
    paddingTop: number;
    paddingBottom: number;
    backgroundColor: string;
    reviewed: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
