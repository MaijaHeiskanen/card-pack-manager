import express from 'express';
import PingController from '../controllers/ping';
import CardpackRouter from './cardpack.router';
import CardRouter from './card.router';
import UserRouter from './user.router';
import LanguageRouter from './language.router';

const router = express.Router();

router.get('/ping', async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();

    return res.send(response);
});

router.use('/cards', CardRouter);

router.use('/cardpacks', CardpackRouter);

router.use('/users', UserRouter);

router.use('/languages', LanguageRouter);

export default router;
