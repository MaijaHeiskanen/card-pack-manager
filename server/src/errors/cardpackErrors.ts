export class CardpackNotFoundError extends Error {
    id: string | undefined;

    constructor(id?: string) {
        super('Cardpack not found.');

        this.id = id;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CardpackNotFoundError.prototype);
    }
}
