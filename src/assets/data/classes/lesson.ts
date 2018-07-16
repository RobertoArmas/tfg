import { Basic } from './chunks/basic';
import { HeadingText } from './chunks/headingText';
import { TwoCol } from './chunks/twoCol';

export class Lesson {
    id: string;
    sectionId: string;
    title: string;
    chunks: Basic[] | HeadingText[] | TwoCol[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
