const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { ensureAuthenticated, authenticateUser } = require('../controllers/authController');

const sendEmailErrors = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Invalid Email Address'),
  check('subject').notEmpty().withMessage('Subject is required'),
  check('message').notEmpty().withMessage('Message is required')
];

const { 
  getHomePage,
  getAdminPage,
  getResumeEditorPage,
  getDebugMode,
  getEmailForm,
  sendEmailFunction
} = require('../controllers/pagesController');

const {
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
} = require('../controllers/resumeController');

///////////////////// MAIN //////////////////////////

router.get('/', getHomePage);

router.get('/admin', ensureAuthenticated, getAdminPage);

router.get('/admin/resume_editor', ensureAuthenticated, getResumeEditorPage);

router.post('/contact', sendEmailErrors, sendEmailFunction);

// Authenticated Resume Routes
router.post('/api/resume/save', ensureAuthenticated, saveOrUpdateResume);
router.get('/api/resume', ensureAuthenticated, getResumeInfo);
router.post('/api/resume/work-experience', ensureAuthenticated, addOrUpdateWorkExperience);
router.delete('/api/resume/work-experience', ensureAuthenticated, deleteWorkExperience);
router.get('/api/resume/work-experience/:id', ensureAuthenticated, getWorkExperience);
router.post('/api/resume/education', ensureAuthenticated, addOrUpdateEducation);
router.delete('/api/resume/education', ensureAuthenticated, deleteEducation);
router.get('/api/resume/education/:id', ensureAuthenticated, getEducation);
router.post('/api/resume/project', ensureAuthenticated, addOrUpdateProject);
router.delete('/api/resume/project', ensureAuthenticated, deleteProject);
router.get('/api/resume/project/:id', ensureAuthenticated, getProject);
router.get('/api/resume/projects', ensureAuthenticated, getProjects);
router.get('/api/resume/educations', ensureAuthenticated, getEducations);
router.get('/api/resume/work-experiences', ensureAuthenticated, getWorkExperiences);

// Authentication Routes
router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

router.post('/login', async (req, res) => {
  const { username, password, rememberMe } = req.body;
  const user = await authenticateUser(username, password);
  if (user) {
      req.session.userId = user.id;
      if (rememberMe) {
          req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
      } else {
          req.session.cookie.expires = false; // Session cookie
      }
      console.log('User authenticated, session set:', req.session);
      res.redirect('/admin');
  } else {
      console.log('Authentication failed');
      req.flash('error', 'Invalid username or password');
      res.redirect('/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
});

///////////////////// TESTING //////////////////////////

router.get('/debug', getDebugMode);

router.get('/emailform', getEmailForm);

module.exports = router;
