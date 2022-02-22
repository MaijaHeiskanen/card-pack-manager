import envConfig from '../config/config';
import jwt, { TokenExpiredError as JwtTokenExpiredError } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { InvalidTokenError, TokenExpiredError } from '../errors/authErrors';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "BEARER TOKEN"

    if (!token) {
        return next(new InvalidTokenError());
    }

    const authInfo = parse(token, next);

    req.user = undefined;
    req.user = authInfo;

    return next();
};

const parse = (token: string, next: NextFunction) => {
    try {
        return jwt.verify(token, envConfig.ACCESS_TOKEN_SECRET);
    } catch (err) {
        if (err instanceof JwtTokenExpiredError) {
            next(new TokenExpiredError());
        } else {
            next(new InvalidTokenError());
        }
    }
};
