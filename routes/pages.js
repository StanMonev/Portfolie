const express = require('express');
const router = express.Router();

const  { 
  getHomePage,
  getContactPage,
  getAboutPage,
  sendEmail
} = require('../controllers/pages.js')

router.get('/', getHomePage)

router.get('/contacts', getContactPage)

router.get('/about', getAboutPage)

router.post('/contact', sendEmail)

//router.post('/', createProduct) 

//router.put('/:productID', updateProduct) 

//router.delete('/:productID', deleteProduct)

module.exports = router;