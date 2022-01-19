import { ConnectionOptions } from 'typeorm';
import envConfig from './config';
import { Card, Cardpack, Language, User } from '../models';

const config: ConnectionOptions = {
    type: 'postgres',
    host: envConfig.DB_HOST,
    port: envConfig.DB_PORT,
    username: envConfig.DB_USER,
    password: envConfig.DB_PASS,
    database: envConfig.DB_NAME,
    entities: [Cardpack, Card, User, Language],
    synchronize: true,
};

export default config;
