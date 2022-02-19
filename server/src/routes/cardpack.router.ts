import express from 'express';
import CardpackController from '../controllers/cardpack.controller.';
import { CardpackNotFoundError } from '../errors/cardpackErrors';
import { authenticateToken } from '../middleware/authenticate';

const router = express.Router();

router.get('/', async (_req, res) => {
    const controller = new CardpackController();

    try {
        const response = await controller.getCardpacks();

        return res.status(200).send(response);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.post('/', authenticateToken, async (req, res) => {
    const controller = new CardpackController();
    try {
        const response = await controller.createCardpack(req.body, req.user);

        return res.send(response);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.patch('/:id', authenticateToken, async (req, res) => {
    const controller = new CardpackController();

    try {
        const response = await controller.updateCardpack(req.body, req.user);

        return res.status(200).send(response);
    } catch (err) {
        if (err instanceof CardpackNotFoundError) {
            return res.status(404).send(err.message);
        }
        return res.status(500).send(err);
    }
});

router.get('/:id', async (req, res) => {
    const controller = new CardpackController();

    try {
        const response = await controller.getCardpack(req.params.id);

        return res.status(200).send(response);
    } catch (err) {
        if (err instanceof CardpackNotFoundError) {
            return res.status(404).send(err.message);
        }
        return res.status(500).send(err);
    }
});

export default router;
