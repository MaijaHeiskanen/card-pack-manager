// Copy paste from https://dev.to/asjadanis/parsing-env-with-typescript-3jjm

require('dotenv').config();

interface ENV {
    // NODE_ENV: string | undefined;
    HOST: string | undefined;
    PORT: number | undefined;
    DB_PORT: number | undefined;
    DB_HOST: string | undefined;
    DB_USER: string | undefined;
    DB_PASS: string | undefined;
}

interface Config {
    // NODE_ENV: string;
    HOST: string;
    PORT: number;
    DB_PORT: number;
    DB_HOST: string;
    DB_USER: string;
    DB_PASS: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
    return {
        //   NODE_ENV: process.env.NODE_ENV,
        HOST: process.env.HOST,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
    };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in .env`);
        }
    }
    return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
