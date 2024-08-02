const resumeService = require('../services/resumeService');

const ADMIN_ID = 1;

const saveOrUpdateResume = async (req, res) => {
  const userId = req.session.userId;
  const {
    firstName, lastName, town, country, email,
    linkedin, github, website, skills, interests
  } = req.body;

  try {
    const fields = {
      first_name: firstName,
      last_name: lastName,
      town: town,
      country: country,
      email: email,
      linkedin: linkedin,
      github: github,
      website: website,
      skills: skills,
      interests: interests,
      user_id: userId
    };

    const resume = await resumeService.saveOrUpdateResume(userId, fields);
    res.status(200).send({ message: 'Resume saved successfully', resumeId: resume.id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to save resume' });
  }
};

const addOrUpdateWorkExperience = async (req, res) => {
  const userId = req.session.userId;
  const { id, jobTitle, jobDescription, jobBeginDate, stillWorking, jobEndDate } = req.body;

  try {
    const resume = await resumeService.getResumeInfo(userId);
    if (!resume) return res.status(400).send({ message: 'Resume not found' });

    const fields = {
      job_title: jobTitle,
      job_description: jobDescription,
      job_begin_date: jobBeginDate,
      still_working: stillWorking,
      job_end_date: jobEndDate,
      resume_id: resume.id
    };

    const response = await resumeService.addOrUpdateWorkExperience(id, fields);
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to add or update work experience' });
  }
};

const deleteWorkExperience = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.body;

  try {
    const resume = await resumeService.getResumeInfo(userId);
    if (!resume) return res.status(400).send({ message: 'Resume not found' });

    const response = await resumeService.deleteWorkExperience(id);
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to delete work experience' });
  }
};

const addOrUpdateEducation = async (req, res) => {
  const userId = req.session.userId;
  const { id, name, description, fromDate, stillStudying, untilDate } = req.body;

  try {
    const resume = await resumeService.getResumeInfo(userId);
    if (!resume) return res.status(400).send({ message: 'Resume not found' });

    const fields = {
      name,
      description,
      from_date: fromDate,
      still_studying: stillStudying,
      until_date: untilDate,
      resume_id: resume.id
    };

    const response = await resumeService.addOrUpdateEducation(id, fields);
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to add or update education' });
  }
};

const deleteEducation = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.body;

  try {
    const resume = await resumeService.getResumeInfo(userId);
    if (!resume) return res.status(400).send({ message: 'Resume not found' });

    const response = await resumeService.deleteEducation(id);
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to delete education' });
  }
};

const addOrUpdateProject = async (req, res) => {
  const userId = req.session.userId;
  const { id, name, description } = req.body;

  try {
    const resume = await resumeService.getResumeInfo(userId);
    if (!resume) return res.status(400).send({ message: 'Resume not found' });

    const fields = {
      name,
      description,
      resume_id: resume.id
    };

    const response = await resumeService.addOrUpdateProject(id, fields);
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to add or update project' });
  }
};

const deleteProject = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.body;

  try {
    const resume = await resumeService.getResumeInfo(userId);
    if (!resume) return res.status(400).send({ message: 'Resume not found' });

    const response = await resumeService.deleteProject(id);
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to delete project' });
  }
};

const getResumeInfo = async (req, res) => {
  const userId = req.session.userId;

  try {
    const resume = await resumeService.getResumeInfo(userId);
    if (!resume) {
      return res.status(404).send({ message: 'Resume not found' });
    }
    res.status(200).send(resume);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to retrieve resume' });
  }
};

const getWorkExperience = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;

  try {
    const resume = await resumeService.getResumeInfo(userId);
    const workExperience = await resumeService.getWorkExperience(id);
    if (!resume || !workExperience || workExperience.resume_id !== resume.id) {
      return res.status(404).send({ message: 'Work experience not found' });
    }
    res.json(workExperience);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to fetch work experience' });
  }
};

const getEducation = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;

  try {
    const resume = await resumeService.getResumeInfo(userId);
    const education = await resumeService.getEducation(id);
    if (!resume || !education || education.resume_id !== resume.id) {
      return res.status(404).send({ message: 'Education not found' });
    }
    res.json(education);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to fetch education' });
  }
};

const getProject = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;

  try {
    const resume = await resumeService.getResumeInfo(userId);
    const project = await resumeService.getProject(id);
    if (!resume || !project || project.resume_id !== resume.id) {
      return res.status(404).send({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to fetch project' });
  }
};

const getAdminWorkExperiences = async (req, res) => {
  try {
    const experiences = await resumeService.getWorkExperiences(ADMIN_ID);
    res.json(experiences);
  } catch (error) {
    console.error('Error fetching admin work experiences:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAdminEducations = async (req, res) => {
  try {
    const educations = await resumeService.getEducations(ADMIN_ID);
    res.json(educations);
  } catch (error) {
    console.error('Error fetching admin educations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAdminProjects = async (req, res) => {
  try {
    const projects = await resumeService.getProjects(ADMIN_ID);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching admin projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAdminResume = async (req, res) => {
  try {
    const resume = await resumeService.getResumeInfo(ADMIN_ID);
    if (!resume) {
      return res.status(404).json({ error: 'No resume found' });
    }
    res.json(resume);
  } catch (error) {
    console.error('Error fetching admin resume:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getWorkExperiences = async (req, res) => {
  const userId = req.session.userId;

  try {
    const resume = await resumeService.getResumeInfo(userId);
    const workExperiences = await resumeService.getWorkExperiences(resume.id);
    res.status(200).send(workExperiences);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to retrieve work experiences' });
  }
};

const getEducations = async (req, res) => {
  const userId = req.session.userId;

  try {
    const resume = await resumeService.getResumeInfo(userId);
    const educations = await resumeService.getEducations(resume.id);
    res.status(200).send(educations);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to retrieve educations' });
  }
};

const getProjects = async (req, res) => {
  const userId = req.session.userId;

  try {
    const resume = await resumeService.getResumeInfo(userId);
    const projects = await resumeService.getProjects(resume.id);
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
