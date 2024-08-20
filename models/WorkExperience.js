const knex = require('../db/knex');

/**
 * WorkExperience.js
 *
 * This file defines the WorkExperience model, which provides methods to interact with the 'work_experiences' table in the database.
 * The WorkExperience model includes methods for finding, creating, updating, and deleting work experience records associated with a resume.
 *
 * Key functionalities:
 * - Retrieve work experience records by resume ID or by work experience ID.
 * - Insert new work experience records into the database.
 * - Update existing work experience records.
 * - Delete work experience records from the database.
 *
 * This model serves as an abstraction layer between the database and the application logic,
 * allowing for easy and consistent interaction with work experience-related data.
 */
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
