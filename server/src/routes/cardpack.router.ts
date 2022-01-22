import express from 'express';
import CardpackController from '../controllers/cardpack.controller.';
import { authenticateToken } from '../middleware/authenticate';

const router = express.Router();

router.get('/', async (req, res) => {
    const controller = new CardpackController();

    try {
        const response = await controller.getCardpacks();

        return res.status(200).send(response);
    } catch (err) {
        console.error(err);
        // if (err instanceof UserError) {
        //     return res.status(401).send({ message: err.message, type: err.type });
        // }
    }
});

router.post('/', authenticateToken, async (req, res) => {
    // authenticateToken(req);
    const controller = new CardpackController();
    const response = await controller.createCardpack(req.body);

    return res.send(response);
});

router.patch('/:id', async (req, res) => {
    const controller = new CardpackController();
    const response = await controller.updateCardpack(req.body);

    if (!response) {
        res.status(404).send({ message: 'Could not update cardpack' });
    }

    return res.send(response);
});

router.get('/:id', async (req, res) => {
    const controller = new CardpackController();
    const response = await controller.getCardpack(req.params.id);

    if (!response) {
        res.status(404).send({ message: 'No cardpack found with given id' });
    }

    return res.send(response);
});

export default router;
