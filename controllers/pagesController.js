const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

////////////////////////////////////////// <MAIN--> //////////////////////////////////////////

const getHomePage = (req, res) => {
  res.render('index');
}

const getAdminPage = (req, res) => {
  res.render('admin');
}

const getResumeEditorPage = (req, res) => {
  res.render('resume_editor');
}

const getPrivacyPolicyPage = (req, res) => {
  res.render('partials/privacyPolicy');
}

const sendEmailFunction = async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    res.status(400).send(_getJSON('Some form elements are not full.', errors.mapped()));
  }else{
    _setupMailer(req, res);
  }
}

////////////////////////////////////////// <--MAIN> //////////////////////////////////////////

////////////////////////////////////////// <TESTING--> //////////////////////////////////////////

const getDebugMode = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ 'debug': process.env.NODE_ENV !== 'production' }));
}

const getEmailForm = (req, res) => {
  res.render('partials/emailForm');
}

////////////////////////////////////////// <--TESTING> //////////////////////////////////////////



////////////////////////////////////////// <PRIVATE--> //////////////////////////////////////////

async function _setupMailer(req, res) {
  const ejs = require('ejs');
  const path = require('path');

  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_HOST_PORT;
  const fromEmail = process.env.FROM_EMAIL;
  const password = process.env.EMAIL_PASSWORD;
  const toEmail = process.env.TO_EMAIL;

  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  
  const transporter = nodemailer.createTransport({
    host,
    port,
    auth : {
      user: fromEmail,
      pass: password 
    }
  });

  const pathToTemplate = path.join(__dirname, '..', 'views', 'partials', 'emailForm.ejs');

  const data = await ejs.renderFile( pathToTemplate, { name: name, email: email, subject: subject, text: message});

  const mail_option = {
    from : fromEmail,
    to : toEmail,
    subject : req.body.subject,
    text : req.body.message,
    html: data
  };

  transporter.sendMail(mail_option, (error, info) => {
    if(error){
      res.status(500).send(_getJSON(error.message));
    }else{
      res.status(200).send(_getJSON("E-Mail sent successfully!"));
    }
  });
}

function _getJSON(message='', data=null){
  return JSON.stringify({
    msg: message,
    data: data
  });
}

////////////////////////////////////////// <--PRIVATE> //////////////////////////////////////////

module.exports = {
    getHomePage,
    getAdminPage,
    getResumeEditorPage,
    getDebugMode,
    getEmailForm,
    sendEmailFunction,
    getPrivacyPolicyPage
}
 