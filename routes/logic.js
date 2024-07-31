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
  sendEmailFunction,
  getPrivacyPolicyPage
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
  getProjects,
  getAdminWorkExperiences,
  getAdminEducations,
  getAdminProjects,
  getAdminResume
} = require('../controllers/resumeController');

const {
  trackAnalytics,
  setCookiePreference, 
  getAnalyticsData
} = require('../controllers/cookieController');

///////////////////// MAIN //////////////////////////

router.get('/', getHomePage);
router.get('/privacy-policy-content', getPrivacyPolicyPage);

router.get('/admin', ensureAuthenticated, getAdminPage);
router.get('/admin/resume_editor', ensureAuthenticated, getResumeEditorPage);

router.post('/contact', sendEmailErrors, sendEmailFunction);

// Resume Routes
router.post('/api/resume/save', saveOrUpdateResume);
router.get('/api/resume', getResumeInfo);
router.post('/api/resume/work-experience', addOrUpdateWorkExperience);
router.delete('/api/resume/work-experience', deleteWorkExperience);
router.get('/api/resume/work-experience/:id', getWorkExperience);
router.post('/api/resume/education', addOrUpdateEducation);
router.delete('/api/resume/education', deleteEducation);
router.get('/api/resume/education/:id', getEducation);
router.post('/api/resume/project', addOrUpdateProject);
router.delete('/api/resume/project', deleteProject);
router.get('/api/resume/project/:id', getProject);
router.get('/api/resume/projects', getProjects);
router.get('/api/resume/educations', getEducations);
router.get('/api/resume/work-experiences', getWorkExperiences);
router.get('/api/resume/projects-admin', getAdminProjects);
router.get('/api/resume/educations-admin', getAdminEducations);
router.get('/api/resume/work-experiences-admin', getAdminWorkExperiences);
router.get('/api/resume/admin', getAdminResume);

// Cookie and Analytics Routes
router.post('/api/track', trackAnalytics);
router.post('/api/set-preference', setCookiePreference);
router.get('/api/analytics', getAnalyticsData);

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
          req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
      } else {
          req.session.cookie.expires = false;
      }
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
