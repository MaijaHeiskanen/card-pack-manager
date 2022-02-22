export class BaseError extends Error {
    statusCode: number = 500;

    constructor(msg: string, statusCode?: number) {
        super(msg);

        this.statusCode = statusCode || this.statusCode;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, BaseError.prototype);
    }
}
