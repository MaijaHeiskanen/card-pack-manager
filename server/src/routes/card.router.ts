import express from 'express';
import CardController from '../controllers/card.controller';

const router = express.Router();

router.post('/', async (req, res) => {
    const controller = new CardController();
    const response = await controller.createCard(req.body);

    return res.send(response);
});

router.get('/:id', async (req, res) => {
    const controller = new CardController();
    const response = await controller.getCard(req.params.id);

    if (!response) {
        res.status(404).send({ message: 'No card found with given id' });
    }

    return res.send(response);
});

router.get('/cardpack/:id', async (req, res) => {
    const controller = new CardController();
    const response = await controller.getCardsByCardpackId(req.params.id);

    return res.send(response);
});

export default router;
