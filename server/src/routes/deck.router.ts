import express from 'express';
import DeckController from '../controllers/deck.controller.';
import { authenticateToken } from '../middleware/authenticate';

const router = express.Router();

router.get('/', async (req, res) => {
    const controller = new DeckController();

    try {
        const response = await controller.getDecks();

        return res.status(200).send(response);
    } catch (err) {
        // if (err instanceof UserError) {
        //     return res.status(401).send({ message: err.message, type: err.type });
        // }
    }
});

router.post('/', async (req, res) => {
    authenticateToken(req);
    const controller = new DeckController();
    const response = await controller.createDeck(req.body);

    return res.send(response);
});

router.patch('/:id', async (req, res) => {
    const controller = new DeckController();
    const response = await controller.updateDeck(req.body);

    if (!response) {
        res.status(404).send({ message: 'Could not update deck' });
    }

    return res.send(response);
});

router.get('/:id', async (req, res) => {
    const controller = new DeckController();
    const response = await controller.getDeck(req.params.id);

    if (!response) {
        res.status(404).send({ message: 'No deck found with given id' });
    }

    return res.send(response);
});

export default router;
