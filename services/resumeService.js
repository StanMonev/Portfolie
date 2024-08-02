const Resume = require('../models/Resume');
const WorkExperience = require('../models/WorkExperience');
const Education = require('../models/Education');
const Project = require('../models/Project');

const saveOrUpdateResume = async (userId, fields) => {
  let resume = await Resume.findByUserId(userId);
  if (resume) {
    await Resume.update(resume.id, fields);
  } else {
    resume = await Resume.create(fields);
  }
  return resume;
};

const addOrUpdateWorkExperience = async (id, fields) => {
  if (id) {
    await WorkExperience.update(id, fields);
    return { message: 'Work experience updated successfully' };
  } else {
    await WorkExperience.create(fields);
    return { message: 'Work experience added successfully' };
  }
};

const deleteWorkExperience = async (id) => {
  await WorkExperience.delete(id);
  return { message: 'Work experience deleted successfully' };
};

const addOrUpdateEducation = async (id, fields) => {
  if (id) {
    await Education.update(id, fields);
    return { message: 'Education updated successfully' };
  } else {
    await Education.create(fields);
    return { message: 'Education added successfully' };
  }
};

const deleteEducation = async (id) => {
  await Education.delete(id);
  return { message: 'Education deleted successfully' };
};

const addOrUpdateProject = async (id, fields) => {
  if (id) {
    await Project.update(id, fields);
    return { message: 'Project updated successfully' };
  } else {
    await Project.create(fields);
    return { message: 'Project added successfully' };
  }
};

const deleteProject = async (id) => {
  await Project.delete(id);
  return { message: 'Project deleted successfully' };
};

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
