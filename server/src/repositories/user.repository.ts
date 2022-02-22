import { getRepository } from 'typeorm';
import { User } from '../models';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import envConfig from '../config/config';
import {
    EmailAlreadyRegisteredError,
    EmailNotRegisteredError,
    GoogleTokenIdError,
    UsernameAlreadyTakenError,
} from '../errors/userErrors';
import { IUserMockData } from '../config/mockData/getMockUsers';

export interface ILoginPayload {
    tokenId: string;
}

export interface IRegisterPayload extends ILoginPayload {
    username: string;
}

export interface IValidateUsernamePayload {
    username: string;
}

export interface IValidateTokenIdPayload {
    tokenId: string;
}

export interface Registered {
    user: User;
    accessToken: string;
}

export interface LoggedIn {
    user: User;
    accessToken: string;
}

export interface ValidateResult {
    valid: boolean;
    status: string;
}

export interface IUpdateUserPayload {
    username: string;
}

export const loginUser = async (payload: ILoginPayload): Promise<LoggedIn> => {
    console.log({ tokenId: payload.tokenId });
    const { tokenId } = payload;
    const client = new OAuth2Client(envConfig.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: envConfig.GOOGLE_CLIENT_ID,
    });

    const googleUser = ticket.getPayload();

    if (!googleUser) {
        throw new GoogleTokenIdError();
    }

    const repository = getRepository(User);
    const user = await repository.findOne({ email: googleUser.email });

    if (!user) {
        throw new EmailNotRegisteredError();
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
        throw new GoogleTokenIdError();
    }

    const repository = getRepository(User);
    const existingUserWithSameEmail = await repository.findOne({ email: googleUser.email });

    if (existingUserWithSameEmail) {
        throw new EmailAlreadyRegisteredError();
    }

    const existingUserWithSameUsername = await repository.findOne({ username: username });

    if (existingUserWithSameUsername) {
        throw new UsernameAlreadyTakenError();
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

export const validateUsername = async (payload: IValidateUsernamePayload): Promise<ValidateResult> => {
    const repository = getRepository(User);
    const existingUserWithSameUsername = await repository.findOne({ username: payload.username });

    if (existingUserWithSameUsername) {
        throw new UsernameAlreadyTakenError();
    }

    return {
        valid: true,
        status: '',
    };
};

export const validateTokenId = async (payload: IValidateTokenIdPayload): Promise<ValidateResult> => {
    const client = new OAuth2Client(envConfig.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken: payload.tokenId,
        audience: envConfig.GOOGLE_CLIENT_ID,
    });

    const googleUser = ticket.getPayload();

    if (!googleUser) {
        throw new GoogleTokenIdError();
    }

    const repository = getRepository(User);
    const existingUserWithSameEmail = await repository.findOne({ email: googleUser.email });

    if (existingUserWithSameEmail) {
        throw new EmailAlreadyRegisteredError();
    }

    return {
        valid: true,
        status: '',
    };
};

export const addMockDataUser = async (payload: IUserMockData): Promise<User> => {
    const repository = getRepository(User);
    const user = new User();

    return await repository.save({
        ...user,
        ...payload,
    });
};
