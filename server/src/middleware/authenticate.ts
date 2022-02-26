import envConfig from '../config/config';
import jwt, { TokenExpiredError as JwtTokenExpiredError } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { InvalidTokenError, TokenExpiredError } from '../errors/authErrors';

/**
 * Adds userId from authorization header to request body.
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "BEARER TOKEN"

    if (!token) {
        return next(new InvalidTokenError());
    }

    const authInfo = parse(token, next);

    console.log(authInfo);

    req.body.userId = undefined;

    if (authInfo && typeof authInfo !== 'string') {
        req.body.userId = authInfo.user.id;
    }

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
