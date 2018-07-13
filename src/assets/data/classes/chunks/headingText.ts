export class HeadingText implements Chunk {
    type: string;
    id: string;
    headingData: string;
    textData: string;
    paddingTop: number;
    paddingBottom: number;
    backgroundColor: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
