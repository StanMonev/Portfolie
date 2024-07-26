const Resume = require('../models/Resume');
const WorkExperience = require('../models/WorkExperience');
const Education = require('../models/Education');
const Project = require('../models/Project');
const ADMIN_ID = 1;

// Save or Update General Resume Information
const saveOrUpdateResume = async (req, res) => {
  const userId = req.session.userId;
  const {
    firstName, lastName, town, country, email,
    linkedin, github, website, skills, interests
  } = req.body;

  try {
    const fields = {
      firstName,
      lastName,
      town,
      country,
      email,
      linkedin,
      github,
      website,
      skills,
      interests,
      user_id: userId
    };

    let resume = await Resume.findByUserId(userId);
    if (resume) {
      await Resume.update(resume.id, fields);
    } else {
      resume = await Resume.create(fields);
    }

    res.status(200).send({ message: 'Resume saved successfully', resumeId: resume.id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to save resume' });
  }
};

// Add or Update Work Experience
const addOrUpdateWorkExperience = async (req, res) => {
  const userId = req.session.userId;
  const { id, jobTitle, jobDescription, jobBeginDate, stillWorking, jobEndDate } = req.body;

  try {
    const resume = await Resume.findByUserId(userId);
    if (!resume) return res.status(400).send({ message: 'Resume not found' });

    const fields = {
      jobTitle, 
      jobDescription, 
      jobBeginDate, 
      stillWorking, 
      jobEndDate, 
      resume_id: resume.id
    };

    if (id) {
      // Update existing work experience
      await WorkExperience.update(id, fields);
      res.status(200).send({ message: 'Work experience updated successfully' });
    } else {
      // Add new work experience
      await WorkExperience.create(fields);
      res.status(201).send({ message: 'Work experience added successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to add or update work experience' });
  }
};

// Delete Work Experience
const deleteWorkExperience = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.body;

  try {
    const resume = await Resume.findByUserId(userId);
    if (!resume) return res.status(400).send({ message: 'Resume not found' });

    await WorkExperience.delete(id);
    res.status(200).send({ message: 'Work experience deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to delete work experience' });
  }
};

// Add or Update Education
const addOrUpdateEducation = async (req, res) => {
  const userId = req.session.userId;
  const { id, name, description, fromDate, stillStudying, untilDate } = req.body;

  try {
    const resume = await Resume.findByUserId(userId);
    if (!resume) return res.status(400).send({ message: 'Resume not found' });

    const fields = {
      name, 
      description, 
      fromDate, 
      stillStudying, 
      untilDate, 
      resume_id: resume.id
    };

    if (id) {
      // Update existing education
      await Education.update(id, fields);
      res.status(200).send({ message: 'Education updated successfully' });
    } else {
      // Add new education
      await Education.create(fields);
      res.status(201).send({ message: 'Education added successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to add or update education' });
  }
};

// Delete Education
const deleteEducation = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.body;

  try {
    const resume = await Resume.findByUserId(userId);
    if (!resume) return res.status(400).send({ message: 'Resume not found' });

    await Education.delete(id);
    res.status(200).send({ message: 'Education deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to delete education' });
  }
};

// Add or Update Project
const addOrUpdateProject = async (req, res) => {
  const userId = req.session.userId;
  const { id, name, description } = req.body;

  try {
    const resume = await Resume.findByUserId(userId);
    if (!resume) return res.status(400).send({ message: 'Resume not found' });

    const fields = { 
      name, 
      description, 
      resume_id: resume.id 
    };

    if (id) {
      // Update existing project
      await Project.update(id, fields);
      res.status(200).send({ message: 'Project updated successfully' });
    } else {
      // Add new project
      await Project.create(fields);
      res.status(201).send({ message: 'Project added successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to add or update project' });
  }
};

// Delete Project
const deleteProject = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.body;

  try {
    const resume = await Resume.findByUserId(userId);
    if (!resume) return res.status(400).send({ message: 'Resume not found' });

    await Project.delete(id);
    res.status(200).send({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to delete project' });
  }
};

// Get General Resume Information
const getResumeInfo = async (req, res) => {
  const userId = req.session.userId;

  try {
    const resume = await Resume.findByUserId(userId);
    if (!resume) {
      return res.status(404).send({ message: 'Resume not found' });
    }
    res.status(200).send(resume);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to retrieve resume' });
  }
};

// Get Specific Work Experience
const getWorkExperience = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;

  try {
    const resume = await Resume.findByUserId(userId);
    const workExperience = await WorkExperience.findById(id);
    if (!resume || !workExperience || workExperience.resume_id !== resume.id) {
      return res.status(404).send({ message: 'Work experience not found' });
    }
    res.json(workExperience);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to fetch work experience' });
  }
};

// Get Specific Education
const getEducation = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;

  try {
    const resume = await Resume.findByUserId(userId);
    const education = await Education.findById(id);
    if (!resume || !education || education.resume_id !== resume.id) {
      return res.status(404).send({ message: 'Education not found' });
    }
    res.json(education);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to fetch education' });
  }
};

// Get Specific Project
const getProject = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;

  try {
    const resume = await Resume.findByUserId(userId);
    const project = await Project.findById(id);
    if (!resume || !project || project.resume_id !== resume.id) {
      return res.status(404).send({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to fetch project' });
  }
};

// Get Admin Work Experiences
const getAdminWorkExperiences = async (req, res) => {
  try {
    const experiences = await WorkExperience.findByResumeId(ADMIN_ID);
    res.json(experiences);
  } catch (error) {
    console.error('Error fetching admin work experiences:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get Admin Educations
const getAdminEducations = async (req, res) => {
  try {
    const educations = await Education.findByResumeId(ADMIN_ID);
    res.json(educations);
  } catch (error) {
    console.error('Error fetching admin educations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get Admin Projects
const getAdminProjects = async (req, res) => {
  try {
    const projects = await Project.findByResumeId(ADMIN_ID);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching admin projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get Admin Resume
const getAdminResume = async (req, res) => {
  try {
    const resume = await Resume.findByUserId(ADMIN_ID);
    if (!resume) {
      return res.status(404).json({ error: 'No resume found' });
    }
    res.json(resume);
  } catch (error) {
    console.error('Error fetching admin resume:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get All Work Experiences
const getWorkExperiences = async (req, res) => {
  const userId = req.session.userId;

  try {
    const resume = await Resume.findByUserId(userId);
    const workExperiences = await WorkExperience.findByResumeId(resume.id);
    res.status(200).send(workExperiences);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to retrieve work experiences' });
  }
};

// Get All Educations
const getEducations = async (req, res) => {
  const userId = req.session.userId;

  try {
    const resume = await Resume.findByUserId(userId);
    const educations = await Education.findByResumeId(resume.id);
    res.status(200).send(educations);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to retrieve educations' });
  }
};

// Get All Projects
const getProjects = async (req, res) => {
  const userId = req.session.userId;

  try {
    const resume = await Resume.findByUserId(userId);
    const projects = await Project.findByResumeId(resume.id);
    res.status(200).send(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to retrieve projects' });
  }
};

module.exports = {
  saveOrUpdateResume,
  getResumeInfo,
  addOrUpdateWorkExperience,
  deleteWorkExperience,
  addOrUpdateEducation,
  deleteEducation,
  addOrUpdateProject,
  deleteProject,
  getWorkExperience,
  getEducation,
  getProject,
  getWorkExperiences,
  getEducations,
  getProjects,
  getAdminWorkExperiences,
  getAdminEducations,
  getAdminProjects,
  getAdminResume
};
