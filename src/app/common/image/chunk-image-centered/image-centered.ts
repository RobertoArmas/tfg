import { ChunkData } from '../../chunk.model';

export class ImageCentered implements ChunkData {
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
