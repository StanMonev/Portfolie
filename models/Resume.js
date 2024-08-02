const knex = require('../db/knex');

class Resume {
    static async findById(id) {
        return knex('resumes').where({ id }).first();
    }

    static async findByUserId(userId) {
        return knex('resumes').where({ user_id: userId }).first();
    }

    static async create(data) {
        return knex('resumes').insert(data).returning('*');
    }

    static async update(id, data) {
        return knex('resumes').where({ id }).update(data).returning('*');
    }

    static async delete(id) {
        return knex('resumes').where({ id }).del();
    }
}

module.exports = Resume;
