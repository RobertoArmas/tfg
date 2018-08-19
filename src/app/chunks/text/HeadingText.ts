import { ChunkData } from '../chunk.model';

export class HeadingText implements ChunkData {
    headingData: string;
    textData: string;
    statementData: string;
    paddingTop: number;
    paddingBottom: number;
    backgroundColor: string;
    reviewed: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
