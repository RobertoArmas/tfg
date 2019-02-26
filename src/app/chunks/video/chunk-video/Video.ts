import { ChunkData } from '../../chunk.model';

export class Video implements ChunkData {
    videoId: string;
    transcriptUrl?: string;

    statementData?: string;
    paddingTop?: number;
    paddingBottom?: number;
    backgroundColor?: string;
    reviewed?: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
