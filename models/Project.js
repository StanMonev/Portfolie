const knex = require('../db/knex');

class Project {
    static async findByResumeId(resumeId) {
        return knex('projects').where({ resume_id: resumeId }).orderBy('created_at', 'asc');
    }

    static async findById(id) {
        return knex('projects').where({ id }).first();
    }

    static async create(data) {
        return knex('projects').insert(data).returning('*');
    }

    static async update(id, data) {
        return knex('projects').where({ id }).update(data).returning('*');
    }

    static async delete(id) {
        return knex('projects').where({ id }).del();
    }
}

module.exports = Project;
