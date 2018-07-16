import { Type } from '@angular/core';

export class Basic implements Chunk {
    type: string;
    id: string;
    data: string;
    paddingTop: number;
    paddingBottom: number;
    backgroundColor: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
