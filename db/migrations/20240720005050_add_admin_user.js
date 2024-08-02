const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;
    const email = process.env.ADMIN_EMAIL;

    if (!username || !password || !email) {
        throw new Error("Missing required environment variables for admin user");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return knex('users').insert({
        username: username,
        password: hashedPassword,
        email: email
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    const username = process.env.ADMIN_USERNAME;

    if (!username) {
        throw new Error("Missing required environment variable for admin username");
    }

    return knex('users').where({ username: username }).del();
};
