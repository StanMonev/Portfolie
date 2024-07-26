const knex = require('../db/knex');

class Education {
    static async findByResumeId(resumeId) {
        return knex('educations').where({ resume_id: resumeId }).orderBy('from_date', 'asc');
    }

    static async findById(id) {
        return knex('educations').where({ id }).first();
    }

    static async create(data) {
        return knex('educations').insert(data).returning('*');
    }

    static async update(id, data) {
        return knex('educations').where({ id }).update(data).returning('*');
    }

    static async delete(id) {
        return knex('educations').where({ id }).del();
    }
}

module.exports = Education;
