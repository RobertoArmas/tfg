import { ChunkData } from '../../chunk.model';

export class ImageFull implements ChunkData {
    url: string;
    caption: string;
    statementData: string;
    backgroundColor: string;
    paddingBottom: number;
    paddingTop: number;
    reviewed: boolean;
    longDesc: string;
    isDecorative: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
