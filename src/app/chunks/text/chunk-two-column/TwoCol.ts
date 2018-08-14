import { ChunkData } from '../../chunk.model';

export class TwoCol implements ChunkData {
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
