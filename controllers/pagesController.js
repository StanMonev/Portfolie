/**
 * pagesController.js
 *
 * This file contains controller functions responsible for rendering various pages
 * of the application and handling specific form submissions, such as the contact form.
 * It also includes utility functions for sending responses in JSON format.
 *
 * Key functionalities:
 * - Render static pages, including the home page, admin page, and policy content pages.
 * - Handle form submissions for sending emails using a service.
 * - Provide debugging information based on the environment.
 *
 * This controller is central to serving the static content and handling some
 * dynamic actions like sending emails, ensuring the smooth operation of the application's front-end.
 */

const { validationResult } = require('express-validator');
const emailService = require('../services/emailService');
const path = require('path');


/**
 * Handles the submission of the contact form and sends an email using the email service.
 * 
 * @param {Object} req - The request object containing form data such as name, email, subject, and message.
 * @param {Object} res - The response object used to send the result of the email operation.
 * @returns {Promise<void>} - Sends a JSON response indicating success or any validation errors.
 */

const sendEmailFunction = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send(_getJSON('Some form elements are not full.', errors.mapped()));
  } else {
    const mailOptions = {
      templatePath: path.join(__dirname, '..', 'views', 'partials', 'emailForm.ejs'),
      templateData: {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        text: req.body.message
      },
      fromEmail: process.env.FROM_EMAIL,
      toEmail: process.env.TO_EMAIL,
      subject: req.body.subject,
      text: req.body.message
    };

    try {
      await emailService.setupMailer(mailOptions);
      res.status(200).send(_getJSON("E-Mail sent successfully!"));
    } catch (error) {
      res.status(500).send(_getJSON(error.message));
    }
  }
};

// //////////////////////
// Page Rendering Logic
// //////////////////////

const getHomePage = (req, res) => {
  res.render('index');
};

const getAdminPage = (req, res) => {
  res.render('admin');
};

const getResumeEditorPage = (req, res) => {
  res.render('resume_editor');
};

const getTACPolicyContent = (req, res) => {
  res.render('partials/tacPolicy');
};

const getPrivacyPolicyContent = (req, res) => {
  res.render('partials/privacyPolicy');
};

const getCookiePolicyContent = (req, res) => {
  res.render('partials/cookiePolicy');
};

const getCopyrightContent = (req, res) => {
  res.render('partials/copyright');
};

const getDebugMode = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ 'debug': process.env.NODE_ENV !== 'production' }));
};

const getEmailForm = (req, res) => {
  res.render('partials/emailForm');
};

// ///////////////////
// Private functions
// ///////////////////

function _getJSON(message = '', data = null) {
  return JSON.stringify({
    msg: message,
    data: data
  });
}

// ///////
// Export
// ///////

module.exports = {
  getHomePage,
  getAdminPage,
  getResumeEditorPage,
  getDebugMode,
  getEmailForm,
  sendEmailFunction,
  getTACPolicyContent,
  getPrivacyPolicyContent,
  getCookiePolicyContent,
  getCopyrightContent
};
