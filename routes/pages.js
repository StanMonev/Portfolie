const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const sendEmailErrors = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Invalid Email Address'),
  check('subject').notEmpty().withMessage('Subject is required'),
  check('message').notEmpty().withMessage('Message is required')
];

const  { 
  getHomePage,
  getAdminPage,
  getResumeEditorPage,
  getDebugMode,
  getEmailForm,
  sendEmailFunction
} = require('../controllers/pages.js')

///////////////////// MAIN //////////////////////////

router.get('/', getHomePage)

router.get('/admin', getAdminPage)

router.get('/admin/resume_editor', getResumeEditorPage)

router.post('/contact', sendEmailErrors, sendEmailFunction)


///////////////////// TESTING //////////////////////////

router.get('/debug', getDebugMode)

router.get('/emailform', getEmailForm)


module.exports = router;