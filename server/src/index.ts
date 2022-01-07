import envConfig from './config/config';
import express, { Application } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import logger from './utils/logger';
import dbConfig from './config/database';
import Router from './routes';
import { createConnection } from 'typeorm';

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

createConnection(dbConfig)
    .then((_connection) => {
        app.listen(PORT, () => {
            logger.info(`Server listening at http://${HOST}:${PORT}`);
        });
    })
    .catch((err) => {
        console.log('Unable to connect to db', err);
        process.exit(1);
    });

module.exports = app;
