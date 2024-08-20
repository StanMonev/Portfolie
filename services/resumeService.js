/**
 * resumeService.js
 *
 * This service file provides a set of functions for managing resumes, work experiences,
 * education entries, and projects within the application. It interacts with the
 * respective models to create, update, retrieve, and delete records associated with a user's resume.
 * 
 * The resume itself cannot be deleted as there is only one resume per person and will be deleted
 * after the user has deleted the account.
 *
 * Key functionalities:
 * - Save or update resume details for a user.
 * - Add, update, or delete work experiences, education entries, and projects.
 * - Retrieve detailed information about a user's resume, work experiences, education, and projects.
 *
 * This service acts as an intermediary between the controllers and the models,
 * ensuring that all operations related to resumes are handled efficiently and consistently.
 */

const Resume = require('../models/Resume');
const WorkExperience = require('../models/WorkExperience');
const Education = require('../models/Education');
const Project = require('../models/Project');


/**
 * Saves or updates a resume for a specific user.
 * 
 * @param {string} userId - The ID of the user whose resume is being saved or updated.
 * @param {Object} fields - An object containing the fields to be saved or updated.
 * @returns {Promise<Object>} - Returns the saved or updated resume object.
 */

const saveOrUpdateResume = async (userId, fields) => {
  let resume = await Resume.findByUserId(userId);
  if (resume) {
    await Resume.update(resume.id, fields);
  } else {
    resume = await Resume.create(fields);
  }
  return resume;
};

/**
 * Adds or updates a work experience entry.
 * 
 * @param {string|null} id - The ID of the work experience entry to update, or null to add a new entry.
 * @param {Object} fields - An object containing the fields to be saved or updated.
 * @returns {Promise<Object>} - Returns a message indicating the result of the operation.
 */

const addOrUpdateWorkExperience = async (id, fields) => {
  if (id) {
    await WorkExperience.update(id, fields);
    return { message: 'Work experience updated successfully' };
  } else {
    await WorkExperience.create(fields);
    return { message: 'Work experience added successfully' };
  }
};

/**
 * Deletes a work experience entry.
 * 
 * @param {string} id - The ID of the work experience entry to delete.
 * @returns {Promise<Object>} - Returns a message indicating the result of the operation.
 */

const deleteWorkExperience = async (id) => {
  await WorkExperience.delete(id);
  return { message: 'Work experience deleted successfully' };
};

/**
 * Adds or updates an education entry.
 * 
 * @param {string|null} id - The ID of the education entry to update, or null to add a new entry.
 * @param {Object} fields - An object containing the fields to be saved or updated.
 * @returns {Promise<Object>} - Returns a message indicating the result of the operation.
 */

const addOrUpdateEducation = async (id, fields) => {
  if (id) {
    await Education.update(id, fields);
    return { message: 'Education updated successfully' };
  } else {
    await Education.create(fields);
    return { message: 'Education added successfully' };
  }
};

/**
 * Deletes an education entry.
 * 
 * @param {string} id - The ID of the education entry to delete.
 * @returns {Promise<Object>} - Returns a message indicating the result of the operation.
 */

const deleteEducation = async (id) => {
  await Education.delete(id);
  return { message: 'Education deleted successfully' };
};

/**
 * Adds or updates a project entry.
 * 
 * @param {string|null} id - The ID of the project entry to update, or null to add a new entry.
 * @param {Object} fields - An object containing the fields to be saved or updated.
 * @returns {Promise<Object>} - Returns a message indicating the result of the operation.
 */

const addOrUpdateProject = async (id, fields) => {
  if (id) {
    await Project.update(id, fields);
    return { message: 'Project updated successfully' };
  } else {
    await Project.create(fields);
    return { message: 'Project added successfully' };
  }
};

/**
 * Deletes a project entry.
 * 
 * @param {string} id - The ID of the project entry to delete.
 * @returns {Promise<Object>} - Returns a message indicating the result of the operation.
 */

const deleteProject = async (id) => {
  await Project.delete(id);
  return { message: 'Project deleted successfully' };
};

// //////////
// GET Logic
// //////////

const getResumeInfo = async (userId) => {
  return await Resume.findByUserId(userId);
};

const getWorkExperience = async (id) => {
  return await WorkExperience.findById(id);
};

const getEducation = async (id) => {
  return await Education.findById(id);
};

const getProject = async (id) => {
  return await Project.findById(id);
};

const getWorkExperiences = async (resumeId) => {
  return await WorkExperience.findByResumeId(resumeId);
};

const getEducations = async (resumeId) => {
  return await Education.findByResumeId(resumeId);
};

const getProjects = async (resumeId) => {
  return await Project.findByResumeId(resumeId);
};

module.exports = {
  saveOrUpdateResume,
  addOrUpdateWorkExperience,
  deleteWorkExperience,
  addOrUpdateEducation,
  deleteEducation,
  addOrUpdateProject,
  deleteProject,
  getResumeInfo,
  getWorkExperience,
  getEducation,
  getProject,
  getWorkExperiences,
  getEducations,
  getProjects
};
