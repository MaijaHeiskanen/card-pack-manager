export enum REGISTER_STATUS {
    SUCCESS = 'success',
    EMAIL_ALREADY_TAKEN = 'emailAlreadyTaken',
    USERNAME_ALREADY_TAKEN = 'usernameAlreadyTaken',
    GOOGLE_TOKEN_ID_WAS_INVALID = 'googleTokenIdWasInvalid',
}

export enum LOGIN_STATUS {
    VALID_AND_REGISTERED = 'validAndRegistered',
    TOKEN_ID_VALID_BUT_NOT_REGISTERED = 'tokenIsValidButNotRegistered',
    GOOGLE_TOKEN_ID_WAS_INVALID = 'googleTokenIdWasInvalid',
}

type UserErrorType = REGISTER_STATUS | LOGIN_STATUS;

export class UserError extends Error {
    constructor(msg: string, type?: UserErrorType) {
        super(msg);

        this.type = type;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, UserError.prototype);
    }

    type: string | undefined;
}
