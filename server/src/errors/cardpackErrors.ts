import { BaseError } from './BaseError';

export class CardpackNotFoundError extends BaseError {
    id: string | undefined;

    constructor(id?: string) {
        super('Cardpack not found.', 404);

        this.id = id;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CardpackNotFoundError.prototype);
    }
}

export class CardpackCodeAlreadyTakenError extends BaseError {
    code: string | undefined;

    constructor(code?: string) {
        super('Cardpack code already taken.', 403);

        this.code = code;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CardpackCodeAlreadyTakenError.prototype);
    }
}
