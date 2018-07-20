export class XapiWrapperClass {
    log: XapiLogger;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

class XapiLogger {
    private message: string;
    debug: boolean;

    constructor(msg: string) {
        this.message = msg;
    }
}
