const knex = require('../db/knex');


/**
 * Projects.js
 *
 * This file defines the Project model, which provides methods to interact with the 'projects' table in the database.
 * The Project model includes methods for finding, creating, updating, and deleting project records associated with a resume.
 *
 * Key functionalities:
 * - Retrieve project records by resume ID or by project ID.
 * - Insert new project records into the database.
 * - Update existing project records.
 * - Delete project records from the database.
 *
 * This model serves as an abstraction layer between the database and the application logic,
 * allowing for easy and consistent interaction with the project-related data.
 */
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
