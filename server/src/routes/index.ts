import express from 'express';
import PingController from '../controllers/ping';
import DeckRouter from './deck.router';
import CardRouter from './card.router';
import UserRouter from './user.router';

const router = express.Router();

router.get('/ping', async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();

    return res.send(response);
});

router.use('/cards', CardRouter);

router.use('/decks', DeckRouter);

router.use('/users', UserRouter);

export default router;
