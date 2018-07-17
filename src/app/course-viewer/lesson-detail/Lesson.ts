import { Basic } from '../../common/text/Basic';
import { HeadingText } from '../../common/text/HeadingText';
import { TwoCol } from '../../common/text/chunk-two-column/TwoCol';


export class Lesson {
    id: string;
    sectionId: string;
    title: string;
    chunks: Basic[] | HeadingText[] | TwoCol[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
