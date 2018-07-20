
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

    XAPIWrapper: any;

    ruuid: any;
}

// class XapiWrapperClass {
//     log: XapiLogger;

//     constructor(values: Object = {}) {
//         Object.assign(this, values);
//     }
// }

// class XapiLogger {
//     private message: string;
//     debug: boolean;

//     constructor(msg: string) {
//         this.message = msg;
//     }
// }