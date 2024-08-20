const knex = require('../db/knex');


/**
 * User.js
 *
 * This file defines the User model, which provides methods to interact with the 'users' table in the database.
 * The User model includes methods for finding, creating, updating, and deleting user records.
 *
 * Key functionalities:
 * - Retrieve user records by user ID or by username.
 * - Insert new user records into the database.
 * - Update existing user records.
 * - Delete user records from the database.
 *
 * This model serves as an abstraction layer between the database and the application logic,
 * allowing for easy and consistent interaction with user-related data.
 */
class User {
    static async findById(id) {
        return knex('users').where({ id }).first();
    }

    static async findByUsername(username) {
        return knex('users').where({ username }).first();
    }

    static async create(data) {
        return knex('users').insert(data).returning('*');
    }

    static async update(id, data) {
        return knex('users').where({ id }).update(data).returning('*');
    }

    static async delete(id) {
        return knex('users').where({ id }).del();
    }
}

module.exports = User;
