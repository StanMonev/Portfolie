const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const authController = require('../controllers/authController');
const pagesController = require('../controllers/pagesController');
const resumeController = require('../controllers/resumeController');
const cookieController = require('../controllers/cookieController');

const sendEmailErrors = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Invalid Email Address'),
  check('subject').notEmpty().withMessage('Subject is required'),
  check('message').notEmpty().withMessage('Message is required')
];

///////////////////// MAIN //////////////////////////

router.get('/', pagesController.getHomePage);
router.get('/tac-policy-content', pagesController.getTACPolicyContent);
router.get('/privacy-policy-content', pagesController.getPrivacyPolicyContent);
router.get('/cookie-policy-content', pagesController.getCookiePolicyContent);
router.get('/copyright-content', pagesController.getCopyrightContent);

router.get('/admin', authController.ensureAuthenticated, pagesController.getAdminPage);
router.get('/admin/resume_editor', authController.ensureAuthenticated, pagesController.getResumeEditorPage);

router.post('/contact', sendEmailErrors, pagesController.sendEmailFunction);

// Resume Routes
router.post('/api/resume/save', resumeController.saveOrUpdateResume);
router.get('/api/resume', resumeController.getResumeInfo);
router.post('/api/resume/work-experience', resumeController.addOrUpdateWorkExperience);
router.delete('/api/resume/work-experience', resumeController.deleteWorkExperience);
router.get('/api/resume/work-experience/:id', resumeController.getWorkExperience);
router.post('/api/resume/education', resumeController.addOrUpdateEducation);
router.delete('/api/resume/education', resumeController.deleteEducation);
router.get('/api/resume/education/:id', resumeController.getEducation);
router.post('/api/resume/project', resumeController.addOrUpdateProject);
router.delete('/api/resume/project', resumeController.deleteProject);
router.get('/api/resume/project/:id', resumeController.getProject);
router.get('/api/resume/projects', resumeController.getProjects);
router.get('/api/resume/educations', resumeController.getEducations);
router.get('/api/resume/work-experiences', resumeController.getWorkExperiences);
router.get('/api/resume/projects-admin', resumeController.getAdminProjects);
router.get('/api/resume/educations-admin', resumeController.getAdminEducations);
router.get('/api/resume/work-experiences-admin', resumeController.getAdminWorkExperiences);
router.get('/api/resume/admin', resumeController.getAdminResume);

// Cookie and Analytics Routes
router.post('/api/track', cookieController.trackAnalytics);
router.post('/api/set-preference', cookieController.setCookiePreference);
router.get('/api/analytics', cookieController.getAnalyticsData);

// Authentication Routes
router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

router.post('/login', authController.loginUser);

router.get('/logout', authController.logoutUser);

///////////////////// TESTING //////////////////////////

router.get('/debug', pagesController.getDebugMode);

router.get('/emailform', pagesController.getEmailForm);

module.exports = router;
