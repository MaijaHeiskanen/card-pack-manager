import config from './config';
import express, { Request, Response, Application } from 'express';
import logger from './utils/logger';
import routes from './routes';

const PORT = config.DB_PORT;
const HOST = config.DB_HOST;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, HOST, () => {
    logger.info(`Server listening at http://${HOST}:${PORT}`);

    routes(app);
});

module.exports = app;
