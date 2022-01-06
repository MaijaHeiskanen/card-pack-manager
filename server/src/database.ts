import postgres, { QueryResult } from 'pg';
import config from './config';

const { Pool } = require('pg');

const RETRY_DELAY = 5 * 1000;
const MAX_TRIES = 50;

const createNewPool = () => {
    return new Pool({
        host: config.DB_HOST,
        user: config.DB_USER,
        port: config.DB_PORT,
        password: config.DB_PASS,
        database: 'postgres',
    });
};

let pool = createNewPool();

export const connectToDB = async () => {
    for (let i = 0; i < MAX_TRIES; i++) {
        try {
            console.log('Trying to connect to database...');

            pool = createNewPool();
            return;
        } catch (e) {
            console.error(e);
            console.log(
                `Couldn't connect to database. Trying again in ${RETRY_DELAY / 1000} seconds (${i + 1}/${MAX_TRIES})`
            );
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }
    }
    process.exit();
};

pool.connect((err: any, client: any, release: any) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err: any, result: any) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log(result.rows);
    });
});
