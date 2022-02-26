import express from 'express';
import LanguageController from '../controllers/language.controller';

const router = express.Router();

router.get('/', async (req, res) => {
    const controller = new LanguageController();
    const response = await controller.getLanguages();

    return res.send(response);
});

export default router;
