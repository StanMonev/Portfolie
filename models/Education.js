const knex = require('../db/knex');


/**
 * Education.js
 *
 * This file defines the Education model, which provides methods to interact with the 'educations' table in the database.
 * The Education model includes methods for finding, creating, updating, and deleting education records associated with a resume.
 *
 * Key functionalities:
 * - Retrieve education records by resume ID or by education ID.
 * - Insert new education records into the database.
 * - Update existing education records.
 * - Delete education records from the database.
 *
 * This model serves as an abstraction layer between the database and the application logic,
 * allowing for easy and consistent interaction with the education-related data.
 */
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
