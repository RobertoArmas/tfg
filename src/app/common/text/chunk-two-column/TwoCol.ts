export class TwoCol implements Chunk {
    dataCol1: string;
    dataCol2: string;
    paddingTop: number;
    paddingBottom: number;
    backgroundColor: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
