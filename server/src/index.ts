import envConfig from './config/config';
import express, { Application, ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import logger from './utils/logger';
import dbConfig from './config/database';
import Router from './routes';
import { createConnection, getRepository } from 'typeorm';
import { setMockData } from './config/setMockData';
import { Cardpack, User } from './models';

const PORT = envConfig.PORT;
const HOST = envConfig.HOST;

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(express.static('public'));

app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: '/swagger.json',
        },
    })
);

app.use(Router);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);

    return res.sendStatus(err.statusCode);
};

app.use(errorHandler);

createConnection(dbConfig)
    .then(async (_connection) => {
        app.listen(PORT, () => {
            logger.info(`Server listening at http://${HOST}:${PORT}`);
        });

        // Check if data already exists; If not, then create mock data.
        const user = await getRepository(User).findOne();

        if (!user) {
            console.info('Setting mock data');

            setMockData();
        }
    })
    .catch((err) => {
        console.log('Unable to connect to db', err);
        process.exit(1);
    });

module.exports = app;
