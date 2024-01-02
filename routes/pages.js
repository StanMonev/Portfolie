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
  getDebugMode,
  sendEmailFunction
} = require('../controllers/pages.js')

router.get('/', getHomePage)

router.get('/debug', getDebugMode)

router.post('/contact', sendEmailErrors, sendEmailFunction)

module.exports = router;