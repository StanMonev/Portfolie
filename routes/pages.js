const express = require('express');
const router = express.Router();

const  { 
  getHomePage,
  getContactPage,
  getAboutPage
} = require('../controllers/pages.js')

router.get('/', getHomePage)

router.get('/contacts', getContactPage)

router.get('/about', getAboutPage)

//router.post('/', createProduct) 

//router.put('/:productID', updateProduct) 

//router.delete('/:productID', deleteProduct)

module.exports = router;