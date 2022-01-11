import { getRepository } from 'typeorm';
import { User } from '../models';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import envConfig from '../config/config';

export interface IVerifyUserPayload {
    tokenId: string;
}

export enum LOGIN_STATUS {
    VALID_AND_REGISTERED = 'validAndRegistered',
    VALID_AND_NOT_REGISTERED = 'validAndNotRegistered',
    INVALID = 'invalid',
}

export interface ILoginPayload {
    tokenId: string;
}

export interface ILoginSuccess {
    status: LOGIN_STATUS.VALID_AND_REGISTERED;
    user: User;
    accessToken: string;
}

export interface ILoginNotRegistered {
    status: LOGIN_STATUS.VALID_AND_NOT_REGISTERED;
    user: null;
    accessToken: null;
}

export interface ILoginError {
    status: LOGIN_STATUS.INVALID;
    user: null;
    accessToken: null;
}

export enum REGISTER_STATUS {
    SUCCESS = 'success',
    EMAIL_ALREADY_TAKEN = 'emailAlreadyTaken',
    USERNAME_ALREADY_TAKEN = 'usernameAlreadyTaken',
    INVALID = 'invalid',
}

export interface IRegisterPayload extends ILoginPayload {
    username: string;
}

export interface IRegisterSuccess {
    status: REGISTER_STATUS.SUCCESS;
    user: User;
    accessToken: string;
}

export interface IRegisterError {
    status: REGISTER_STATUS.EMAIL_ALREADY_TAKEN | REGISTER_STATUS.USERNAME_ALREADY_TAKEN | REGISTER_STATUS.INVALID;
    user: null;
    accessToken: null;
}

type LoginResult = ILoginSuccess | ILoginNotRegistered | ILoginError;
type RegisterResult = IRegisterSuccess | IRegisterError;

export const loginUser = async (payload: ILoginPayload): Promise<LoginResult> => {
    const { tokenId } = payload;
    const client = new OAuth2Client(envConfig.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: envConfig.GOOGLE_CLIENT_ID,
    });

    const googleUser = ticket.getPayload();

    if (!googleUser) {
        return {
            status: LOGIN_STATUS.INVALID,
            user: null,
            accessToken: null,
        } as ILoginError;
    }

    const repository = getRepository(User);
    const user = await repository.findOne({ email: googleUser.email });

    if (!user) {
        return {
            status: LOGIN_STATUS.VALID_AND_NOT_REGISTERED,
            user: null,
            accessToken: null,
        } as ILoginNotRegistered;
    }

    const accessToken = jwt.sign({ user }, envConfig.ACCESS_TOKEN_SECRET, { expiresIn: '30d' });

    return {
        status: LOGIN_STATUS.VALID_AND_REGISTERED,
        user: user,
        accessToken,
    } as ILoginSuccess;
};

export const registerUser = async (payload: IRegisterPayload): Promise<RegisterResult> => {
    const { tokenId, username } = payload;
    const client = new OAuth2Client(envConfig.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: envConfig.GOOGLE_CLIENT_ID,
    });

    const googleUser = ticket.getPayload();

    if (!googleUser) {
        return {
            status: REGISTER_STATUS.INVALID,
            user: null,
            accessToken: null,
        } as IRegisterError;
    }

    const repository = getRepository(User);
    const existingUserWithSameEmail = await repository.findOne({ email: googleUser.email });

    if (existingUserWithSameEmail) {
        return {
            status: REGISTER_STATUS.EMAIL_ALREADY_TAKEN,
            user: null,
            accessToken: null,
        } as IRegisterError;
    }

    const existingUserWithSameUsername = await repository.findOne({ username: username });

    if (existingUserWithSameUsername) {
        return {
            status: REGISTER_STATUS.USERNAME_ALREADY_TAKEN,
            user: null,
            accessToken: null,
        } as IRegisterError;
    }

    const user = await repository.save({
        email: googleUser.email,
        username,
    });
    const accessToken = jwt.sign({ user }, envConfig.ACCESS_TOKEN_SECRET, { expiresIn: '30d' });

    return {
        status: REGISTER_STATUS.SUCCESS,
        user,
        accessToken,
    } as RegisterResult;
};
