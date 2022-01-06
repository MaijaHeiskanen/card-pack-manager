import config from './config';
import express, { Request, Response, Application } from 'express';

import logger from './utils/logger';
import routes from './routes';
import { connectToDB } from './database';

const PORT = config.PORT;
const HOST = config.HOST;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToDB();

app.listen(PORT, HOST, () => {
    logger.info(`Server listening at http://${HOST}:${PORT}`);

    routes(app);
});

module.exports = app;
