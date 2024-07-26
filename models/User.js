const knex = require('../db/knex');

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
