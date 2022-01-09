import { getRepository } from 'typeorm';
import { User } from '../models';
import { OAuth2Client } from 'google-auth-library';
import envConfig from '../config/config';

const client = new OAuth2Client(envConfig.GOOGLE_CLIENT_ID);

export interface IVerifyUserPayload {
    tokenId: string;
}

export const verifyUser = async (payload: IVerifyUserPayload): Promise<User | null | any> => {
    const tokenId = payload.tokenId;
    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: envConfig.GOOGLE_CLIENT_ID,
    });

    const stuff = ticket.getPayload();

    if (!stuff) {
        console.log('stuff was null');
        return null;
    }

    console.log(`User ${stuff.name} verified`);

    return stuff;

    // const repository = getRepository(User);
    // const user = await repository.findOne({ tokenId });

    // if (!user) {
    //     return null;
    // }

    // return user;
};
