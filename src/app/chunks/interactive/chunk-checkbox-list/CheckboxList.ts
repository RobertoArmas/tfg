import { ChunkData } from '../../../chunks/chunk.model';

export class CheckboxList implements ChunkData {
    items: string[];
    statementData: string;
    paddingTop: number;
    paddingBottom: number;
    backgroundColor: string;
    reviewed: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
