import { Response } from 'express';
import { LOGIN_STATUS, REGISTER_STATUS, UserError } from './userErrors';

export const userErrorHandler = (err: UserError, res: Response) => {
    let status: number = 500;

    switch (err.type) {
        case REGISTER_STATUS.EMAIL_ALREADY_TAKEN:
        case REGISTER_STATUS.USERNAME_ALREADY_TAKEN:
            status = 400;
            break;
        case REGISTER_STATUS.GOOGLE_TOKEN_ID_WAS_INVALID:
        case LOGIN_STATUS.GOOGLE_TOKEN_ID_WAS_INVALID:
            status = 404;
            break;
        case LOGIN_STATUS.TOKEN_ID_VALID_BUT_NOT_REGISTERED:
            status = 422;
            break;
        default:
            status = 500;
            break;
    }

    return res.status(status).send({ message: err.message, type: err.type });
};
