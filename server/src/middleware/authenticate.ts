import envConfig from '../config/config';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "BEARER TOKEN"

    const authInfo = parse(token || '36137613789bvshbv');

    console.log({ authInfo });
    return authInfo;
};

const parse = (token: string) => {
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token, envConfig.ACCESS_TOKEN_SECRET);
    } catch (err) {
        console.log(`Token parse error: ${err}`);

        return false;
    }
};
