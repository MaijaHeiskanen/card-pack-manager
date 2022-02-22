import { BaseError } from './BaseError';

export class UserError extends BaseError {
    constructor(msg: string, statusCode?: number) {
        super(msg, statusCode);
    }
}

export class EmailAlreadyRegisteredError extends UserError {
    constructor() {
        super('Email has already been registered.', 403);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, EmailAlreadyRegisteredError.prototype);
    }
}

export class UsernameAlreadyTakenError extends UserError {
    constructor() {
        super('Username has already been taken.', 403);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, UsernameAlreadyTakenError.prototype);
    }
}

export class GoogleTokenIdError extends UserError {
    constructor() {
        super('Google token id was invalid', 400);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, GoogleTokenIdError.prototype);
    }
}

export class EmailNotRegisteredError extends UserError {
    constructor() {
        super('Google account is not registered yet.', 400);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, EmailNotRegisteredError.prototype);
    }
}

export class UserAccessForbiddenError extends UserError {
    constructor(msg: string = 'User has no access to this resource.') {
        super(msg, 403);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, UserAccessForbiddenError.prototype);
    }
}

export class UserNotFoundError extends UserError {
    id: string | undefined;

    constructor(id?: string) {
        super('User not found.', 404);

        this.id = id;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, UserNotFoundError.prototype);
    }
}
