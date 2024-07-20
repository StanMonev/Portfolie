const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Save or Update General Resume Information
const saveOrUpdateResume = async (req, res) => {
  const userId = req.session.userId;
  const {
    firstName, lastName, town, country, email,
    linkedin, github, website, skills, interests
  } = req.body;

  try {
    const existingResume = await pool.query('SELECT id FROM resumes WHERE user_id = $1', [userId]);
    let resumeId;
    
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
      interests: interests
    };

    const filteredFields = Object.keys(fields).filter(key => fields[key] !== undefined && fields[key] !== '');

    if (existingResume.rows.length > 0) {
      resumeId = existingResume.rows[0].id;
      const updateQuery = `
        UPDATE resumes SET ${filteredFields.map((field, index) => `${field} = $${index + 1}`).join(', ')}
        WHERE id = $${filteredFields.length + 1}
      `;
      const updateValues = filteredFields.map(field => fields[field]);
      updateValues.push(resumeId);
      await pool.query(updateQuery, updateValues);
    } else {
      const insertQuery = `
        INSERT INTO resumes (${filteredFields.join(', ')}, user_id)
        VALUES (${filteredFields.map((_, index) => `$${index + 1}`).join(', ')}, $${filteredFields.length + 1})
        RETURNING id
      `;
      const insertValues = filteredFields.map(field => fields[field]);
      insertValues.push(userId);
      const result = await pool.query(insertQuery, insertValues);
      resumeId = result.rows[0].id;
    }

    res.status(200).send({ message: 'Resume saved successfully', resumeId });
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
    const resume = await pool.query('SELECT id FROM resumes WHERE user_id = $1', [userId]);
    if (resume.rows.length === 0) return res.status(400).send({ message: 'Resume not found' });
    const resumeId = resume.rows[0].id;

    if (id) {
      // Update existing work experience
      await pool.query(`
        UPDATE work_experiences SET
        job_title = $1, job_description = $2, job_begin_date = $3,
        still_working = $4, job_end_date = $5
        WHERE id = $6 AND resume_id = $7
      `, [jobTitle, jobDescription, jobBeginDate, stillWorking, jobEndDate, id, resumeId]);
      res.status(200).send({ message: 'Work experience updated successfully' });
    } else {
      // Check if limit is exceeded
      const { rows } = await pool.query('SELECT COUNT(*) AS count FROM work_experiences WHERE resume_id = $1', [resumeId]);
      if (parseInt(rows[0].count, 10) >= 3) {
        return res.status(400).send({ message: 'Cannot add more than 3 work experiences' });
      }
      // Add new work experience
      await pool.query(`
        INSERT INTO work_experiences (resume_id, job_title, job_description, job_begin_date, still_working, job_end_date)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [resumeId, jobTitle, jobDescription, jobBeginDate, stillWorking, jobEndDate]);
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
    const resume = await pool.query('SELECT id FROM resumes WHERE user_id = $1', [userId]);
    if (resume.rows.length === 0) return res.status(400).send({ message: 'Resume not found' });
    const resumeId = resume.rows[0].id;

    await pool.query('DELETE FROM work_experiences WHERE id = $1 AND resume_id = $2', [id, resumeId]);
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
    const resume = await pool.query('SELECT id FROM resumes WHERE user_id = $1', [userId]);
    if (resume.rows.length === 0) return res.status(400).send({ message: 'Resume not found' });
    const resumeId = resume.rows[0].id;

    if (id) {
      // Update existing education
      await pool.query(`
        UPDATE educations SET
        name = $1, description = $2, from_date = $3,
        still_studying = $4, until_date = $5
        WHERE id = $6 AND resume_id = $7
      `, [name, description, fromDate, stillStudying, untilDate, id, resumeId]);
      res.status(200).send({ message: 'Education updated successfully' });
    } else {
      // Check if limit is exceeded
      const { rows } = await pool.query('SELECT COUNT(*) AS count FROM educations WHERE resume_id = $1', [resumeId]);
      if (parseInt(rows[0].count, 10) >= 3) {
        return res.status(400).send({ message: 'Cannot add more than 3 educations' });
      }
      // Add new education
      await pool.query(`
        INSERT INTO educations (resume_id, name, description, from_date, still_studying, until_date)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [resumeId, name, description, fromDate, stillStudying, untilDate]);
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
    const resume = await pool.query('SELECT id FROM resumes WHERE user_id = $1', [userId]);
    if (resume.rows.length === 0) return res.status(400).send({ message: 'Resume not found' });
    const resumeId = resume.rows[0].id;

    await pool.query('DELETE FROM educations WHERE id = $1 AND resume_id = $2', [id, resumeId]);
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
    const resume = await pool.query('SELECT id FROM resumes WHERE user_id = $1', [userId]);
    if (resume.rows.length === 0) return res.status(400).send({ message: 'Resume not found' });
    const resumeId = resume.rows[0].id;

    if (id) {
      // Update existing project
      await pool.query(`
        UPDATE projects SET
        name = $1, description = $2
        WHERE id = $3 AND resume_id = $4
      `, [name, description, id, resumeId]);
      res.status(200).send({ message: 'Project updated successfully' });
    } else {
      // Check if limit is exceeded
      const { rows } = await pool.query('SELECT COUNT(*) AS count FROM projects WHERE resume_id = $1', [resumeId]);
      if (parseInt(rows[0].count, 10) >= 3) {
        return res.status(400).send({ message: 'Cannot add more than 3 projects' });
      }
      // Add new project
      await pool.query(`
        INSERT INTO projects (resume_id, name, description)
        VALUES ($1, $2, $3)
      `, [resumeId, name, description]);
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
    const resume = await pool.query('SELECT id FROM resumes WHERE user_id = $1', [userId]);
    if (resume.rows.length === 0) return res.status(400).send({ message: 'Resume not found' });
    const resumeId = resume.rows[0].id;

    await pool.query('DELETE FROM projects WHERE id = $1 AND resume_id = $2', [id, resumeId]);
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
    const result = await pool.query('SELECT * FROM resumes WHERE user_id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).send({ message: 'Resume not found' });
    }
    const resume = result.rows[0];
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
    const result = await pool.query('SELECT * FROM work_experiences WHERE id = $1 AND resume_id = (SELECT id FROM resumes WHERE user_id = $2)', [id, userId]);
    if (result.rows.length === 0) return res.status(404).send({ message: 'Work experience not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to fetch work experience' });
  }
};

const getEducation = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM educations WHERE id = $1 AND resume_id = (SELECT id FROM resumes WHERE user_id = $2)', [id, userId]);
    if (result.rows.length === 0) return res.status(404).send({ message: 'Education not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to fetch education' });
  }
};

const getProject = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1 AND resume_id = (SELECT id FROM resumes WHERE user_id = $2)', [id, userId]);
    if (result.rows.length === 0) return res.status(404).send({ message: 'Project not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to fetch project' });
  }
};

// Get All Work Experiences
const getWorkExperiences = async (req, res) => {
  const userId = req.session.userId;

  try {
    const result = await pool.query(`
      SELECT we.* FROM work_experiences we
      JOIN resumes r ON we.resume_id = r.id
      WHERE r.user_id = $1
    `, [userId]);
    res.status(200).send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to retrieve work experiences' });
  }
};

// Get All Educations
const getEducations = async (req, res) => {
  const userId = req.session.userId;

  try {
    const result = await pool.query(`
      SELECT e.* FROM educations e
      JOIN resumes r ON e.resume_id = r.id
      WHERE r.user_id = $1
    `, [userId]);
    res.status(200).send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to retrieve educations' });
  }
};

// Get All Projects
const getProjects = async (req, res) => {
  const userId = req.session.userId;

  try {
    const result = await pool.query(`
      SELECT p.* FROM projects p
      JOIN resumes r ON p.resume_id = r.id
      WHERE r.user_id = $1
    `, [userId]);
    res.status(200).send(result.rows);
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
  getProjects
};
