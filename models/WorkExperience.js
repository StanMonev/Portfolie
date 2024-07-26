const knex = require('../db/knex');

class WorkExperience {
    static async findByResumeId(resumeId) {
        return knex('work_experiences').where({ resume_id: resumeId }).orderBy('job_begin_date', 'asc');
    }

    static async findById(id) {
        return knex('work_experiences').where({ id }).first();
    }

    static async create(data) {
        return knex('work_experiences').insert(data).returning('*');
    }

    static async update(id, data) {
        return knex('work_experiences').where({ id }).update(data).returning('*');
    }

    static async delete(id) {
        return knex('work_experiences').where({ id }).del();
    }
}

module.exports = WorkExperience;
