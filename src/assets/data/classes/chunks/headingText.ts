export class HeadingText implements Chunk {
    headingData: string;
    textData: string;
    paddingTop: number;
    paddingBottom: number;
    backgroundColor: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
