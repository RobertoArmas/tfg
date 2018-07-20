// Type definitions for xAPI Wrapper
// Project: https://github.com/adlnet/xAPIWrapper
// Definitions by: Jorge Espinosa
// TypeScript Version: 2.9.2

/**
 * Si explota:
 * Ver: https://www.bennadel.com/blog/3169-adding-custom-typings-files-d-ts-in-an-angular-2-typescript-application.htm
 */

declare var ADL: {
    launch: (callback: (error: string, launchdata: any, xAPIWrapper: any) => void, launch: boolean) => void;

    XAPIWrapper: XapiWrapperClass;

    ruuid: any;
};

class XapiWrapperClass {
    changeConfig: any;
    lrs: any;
    sendStatement: any;
    log: XapiWrapperLog;

    constructor() {}
}

interface XapiWrapperLog {
    (message: any): any ;
    debug: boolean;
}
