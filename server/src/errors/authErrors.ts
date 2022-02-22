import { BaseError } from './BaseError';

export enum AUTH_STATUS {
    TOKEN_EXPIRED = 'tokenExpired',
    INVALID_TOKEN = 'invalidToken',
}

export class AuthError extends BaseError {
    type: string | undefined;
    token: string | undefined;

    constructor(type?: AUTH_STATUS, token?: string) {
        super('AuthError', type === AUTH_STATUS.TOKEN_EXPIRED ? 200 : 400);

        this.type = type;
        this.token = token;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, AuthError.prototype);
    }
}

export class TokenExpiredError extends BaseError {
    constructor() {
        super('AuthError: Token expired', 401);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, TokenExpiredError.prototype);
    }
}

export class InvalidTokenError extends BaseError {
    constructor() {
        super('AuthError: Invalid token', 400);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, InvalidTokenError.prototype);
    }
}
