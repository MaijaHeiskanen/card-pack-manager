import express from 'express';
import UserController from '../controllers/user.controller';
import { userErrorHandler } from '../errors/userErrorHandler';
import { UserError } from '../errors/userErrors';

const router = express.Router();

router.post('/login', async (req, res) => {
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

export default router;
