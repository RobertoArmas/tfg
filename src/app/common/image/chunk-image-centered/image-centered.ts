
export class ImageCentered implements Chunk {
    url: string;
    caption: string;
    statementData: string;
    backgroundColor: string;
    paddingBottom: number;
    paddingTop: number;
    reviewed: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
