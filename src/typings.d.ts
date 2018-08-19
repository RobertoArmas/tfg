
/**
 * Guía oficial sobre la escritura de ficheros d.ts
 * https://github.com/Microsoft/TypeScript-Handbook/tree/master/pages/declaration%20files
 */

interface ADL {}

interface XAPIWrapper {
    changeConfig: (conf: LRSConfiguration) => Object;

    log: XAPIWrapperLog;

    lrs: Object;

    sendStatement: (stmt: Object, callback?: Function) => Object
}

interface LRSConfiguration {
    endpoint: string;
    auth?: string;
}

interface XAPIWrapperLog {
    (message: any): any;
    debug: boolean;
}


declare namespace ADL {
    let XAPIWrapper: XAPIWrapper;

    let ruuid: () => string;

    interface LRS {
        endpoint: string;
        user: string;
        password: string;
        auth?: string;
    }
}