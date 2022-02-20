export class CardpackNotFoundError extends Error {
    id: string | undefined;

    constructor(id?: string) {
        super('Cardpack not found.');

        this.id = id;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CardpackNotFoundError.prototype);
    }
}

export class CardpackCodeAlreadyTakenError extends Error {
    code: string | undefined;

    constructor(code?: string) {
        super('Cardpack code already taken.');

        this.code = code;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CardpackCodeAlreadyTakenError.prototype);
    }
}
