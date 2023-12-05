const express = require('express');
const router = express.Router();

const  { 
  getHomePage,
  getContactPage,
  getAboutPage,
  sendEmailFunction,
  sendEmailErrors
} = require('../controllers/pages.js')

router.get('/', getHomePage)

router.get('/contacts', getContactPage)

router.get('/about', getAboutPage)

router.post('/contact', sendEmailErrors, sendEmailFunction)

module.exports = router;