import express from 'express';
import UserController from '../controllers/user.controller';
import { userErrorHandler } from '../errors/userErrorHandler';
import { UserError } from '../errors/userErrors';

const router = express.Router();

router.post('/login', async (req, res) => {
    console.log('login message thing');

    const controller = new UserController();

    try {
        const response = await controller.loginUser(req.body);

        return res.status(201).send(response);
    } catch (err: any) {
        if (err instanceof UserError) {
            return userErrorHandler(err, res);
        }

        return res.status(500).send({ message: err.message, type: err.type });
    }
});

router.post('/register', async (req, res) => {
    const controller = new UserController();

    try {
        const response = await controller.registerUser(req.body);

        return res.status(201).send(response);
    } catch (err: any) {
        if (err instanceof UserError) {
            return userErrorHandler(err, res);
        }

        return res.status(500).send({ message: err.message, type: err.type });
    }
});

router.post('/register/validate/username', async (req, res) => {
    const controller = new UserController();

    try {
        const response = await controller.validateUsername(req.body);

        return res.status(200).send(response);
    } catch (err: any) {
        return res.status(200).send({ valid: false, status: err.type });
    }
});

router.post('/register/validate/tokenId', async (req, res) => {
    const controller = new UserController();

    try {
        const response = await controller.validateTokenId(req.body);

        return res.status(200).send(response);
    } catch (err: any) {
        return res.status(200).send({ valid: false, status: err.type });
    }
});

export default router;
