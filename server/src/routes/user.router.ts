import express from 'express';
import UserController from '../controllers/user.controller';
import { UserError } from '../errors/userErrors';

const router = express.Router();

router.post('/login', async (req, res) => {
    const controller = new UserController();
    const response = await controller.loginUser(req.body);

    try {
        const response = await controller.loginUser(req.body);

        return res.status(201).send(response);
    } catch (err) {
        if (err instanceof UserError) {
            return res.status(401).send({ message: err.message, type: err.type });
        }
    }
});

router.post('/register', async (req, res) => {
    const controller = new UserController();

    try {
        const response = await controller.registerUser(req.body);

        return res.status(201).send(response);
    } catch (err) {
        if (err instanceof UserError) {
            return res.status(401).send({ message: err.message, type: err.type });
        }
    }
});

export default router;
