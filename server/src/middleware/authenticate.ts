import envConfig from '../config/config';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "BEARER TOKEN"

    if (!token) {
        return next({ status: 'Bearer token missing.', statusCode: 403 });
    }

    const authInfo = parse(token);

    req.user = undefined;
    req.user = authInfo;

    return next();
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
