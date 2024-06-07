require('dotenv').config();

module.exports = {
    development: {
        client: 'postgresql',
        connection: process.env.DEV_DATABASE_URL,
        migrations: {
            directory: './db/migrations'
        },
        seeds: {
            directory: './db/seeds'
        }
    },
    production: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    }
};
