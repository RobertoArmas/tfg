// Type definitions for xAPI Wrapper
// Project: https://github.com/adlnet/xAPIWrapper
// Definitions by: Jorge Espinosa
// TypeScript Version: 2.9.2

declare var ADL: ADL.IAdlStatic;

declare global {
    interface Function {
        $inject?: ReadonlyArray<string>;
    }
}

export as namespace ADL;

export = ADL;

declare namespace ADL {
    interface IAdlStatic {}
}