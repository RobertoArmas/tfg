import { ChunkData } from '../chunk.model';

export class Basic implements ChunkData {
    data: string;
    statementData: string;
    paddingTop: number;
    paddingBottom: number;
    backgroundColor: string;
    reviewed: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
