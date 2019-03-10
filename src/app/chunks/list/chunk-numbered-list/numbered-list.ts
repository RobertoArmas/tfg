import { ChunkData } from '../../chunk.model';


export class NumberedList implements ChunkData {
    items: string[];
    statementData?: string;
    paddingTop?: number;
    paddingBottom?: number;
    backgroundColor?: string;
    reviewed?: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
