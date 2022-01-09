import { ConnectionOptions } from 'typeorm';
import envConfig from './config';
import { Card, Deck } from '../models';

const config: ConnectionOptions = {
    type: 'postgres',
    host: envConfig.DB_HOST,
    port: envConfig.DB_PORT,
    username: envConfig.DB_USER,
    password: envConfig.DB_PASS,
    database: envConfig.DB_NAME,
    entities: [Deck, Card],
    synchronize: true,
};

export default config;

// const { Pool } = require('pg');

// const RETRY_DELAY = 5 * 1000;
// const MAX_TRIES = 50;

// const createNewPool = () => {
//     return new Pool({
//         host: envConfig.DB_HOST,
//         user: envConfig.DB_USER,
//         port: envConfig.DB_PORT,
//         password: envConfig.DB_PASS,
//         database: 'postgres',
//     });
// };

// let pool = createNewPool();

// export const connectToDB = async () => {
//     for (let i = 0; i < MAX_TRIES; i++) {
//         try {
//             console.log('Trying to connect to database...');

//             pool = createNewPool();
//             return;
//         } catch (e) {
//             console.error(e);
//             console.log(
//                 `Couldn't connect to database. Trying again in ${RETRY_DELAY / 1000} seconds (${i + 1}/${MAX_TRIES})`
//             );
//             await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
//         }
//     }
//     process.exit();
// };

// pool.connect((err: any, client: any, release: any) => {
//     if (err) {
//         return console.error('Error acquiring client', err.stack);
//     }
//     client.query('SELECT NOW()', (err: any, result: any) => {
//         release();
//         if (err) {
//             return console.error('Error executing query', err.stack);
//         }
//         console.log(result.rows);
//     });
// });

// const createUser = async (request: Request, response: Response) => {
//     const { name, owner_id, nsfw } = request.body;

//     const result = await pool.query('INSERT INTO decks (name, ownerUser, nsfw) VALUES ($1, $2, $3)', [
//         name,
//         owner_id,
//         nsfw,
//     ]);

//     response.json({ result });
// };

// pool.query('INSERT INTO decks (name, owner_id, nsfw) VALUES ($1, $2, $3)', ['Nimi', 'owner_id', true]);
