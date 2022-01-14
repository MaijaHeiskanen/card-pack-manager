export enum AUTH_STATUS {
    TOKEN_EXPIRED = 'tokenExpired',
    INVALID_TOKEN = 'invalidToken',
}

export class AuthError extends Error {
    constructor(msg: string, type?: AUTH_STATUS) {
        super(msg);

        this.type = type;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, AuthError.prototype);
    }

    type: string | undefined;
}
