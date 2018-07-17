
export class CheckboxList implements Chunk {
    items: string[];
    paddingTop: number;
    paddingBottom: number;
    backgroundColor: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}