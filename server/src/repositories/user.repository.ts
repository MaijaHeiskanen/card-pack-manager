import { getRepository } from 'typeorm';
import { User } from '../models';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import envConfig from '../config/config';
import { LOGIN_STATUS, REGISTER_STATUS, UserError } from '../errors/userErrors';

export interface ILoginPayload {
    tokenId: string;
}

export interface IRegisterPayload extends ILoginPayload {
    username: string;
}

export interface Registered {
    user: User;
    accessToken: string;
}

export interface LoggedIn {
    user: User;
    accessToken: string;
}

export const loginUser = async (payload: ILoginPayload): Promise<LoggedIn> => {
    const { tokenId } = payload;
    const client = new OAuth2Client(envConfig.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: envConfig.GOOGLE_CLIENT_ID,
    });

    const googleUser = ticket.getPayload();

    if (!googleUser) {
        throw new UserError('Google login was invalid.', LOGIN_STATUS.GOOGLE_TOKEN_ID_WAS_INVALID);
    }

    const repository = getRepository(User);
    const user = await repository.findOne({ email: googleUser.email });

    if (!user) {
        throw new UserError('Google account is not registered yet.', LOGIN_STATUS.TOKEN_ID_VALID_BUT_NOT_REGISTERED);
    }

    const accessToken = jwt.sign({ user }, envConfig.ACCESS_TOKEN_SECRET, { expiresIn: '30d' });

    return {
        user: user,
        accessToken,
    };
};

export const registerUser = async (payload: IRegisterPayload): Promise<Registered> => {
    const { tokenId, username } = payload;
    const client = new OAuth2Client(envConfig.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: envConfig.GOOGLE_CLIENT_ID,
    });

    const googleUser = ticket.getPayload();

    if (!googleUser) {
        throw new UserError('Google login was invalid.', REGISTER_STATUS.GOOGLE_TOKEN_ID_WAS_INVALID);
    }

    const repository = getRepository(User);
    const existingUserWithSameEmail = await repository.findOne({ email: googleUser.email });

    if (existingUserWithSameEmail) {
        throw new UserError('Email has already been registered.', REGISTER_STATUS.EMAIL_ALREADY_TAKEN);
    }

    const existingUserWithSameUsername = await repository.findOne({ username: username });

    if (existingUserWithSameUsername) {
        throw new UserError('Username has already been taken..', REGISTER_STATUS.USERNAME_ALREADY_TAKEN);
    }

    const user = await repository.save({
        email: googleUser.email,
        username,
    });

    const accessToken = jwt.sign({ user }, envConfig.ACCESS_TOKEN_SECRET, { expiresIn: '30d' });

    return {
        user,
        accessToken,
    };
};
