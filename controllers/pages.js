const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const getHomePage = ((req, res) => {
    res.render('index');
})

const getContactPage = ((req, res) => {
  res.render('contactPage');
})

const getAboutPage = ((req, res) => {
  res.render('aboutPage');
})

const sendEmailFunction = ( (req, res) => {
  const errors = validationResult(req);
  console.log(req);
  console.log(errors);
  console.log(req.params);
  if(!errors.isEmpty()){
    res.status(400).send({ errors : errors.mapped() });
  }else{
    const transporter = nodemailer.createTransport({
      service : 'Gmail',
      auth : {
        user : 'stanimirr.monev@gmail.com',
        pass : process.env.EMAIL_REDIRECT_PASSWORD
      }
    });

    const mail_option = {
      from : request.body.email,
      to : 'stanimirr.monev@gmail.com',
      subject : request.body.subject,
      text : request.body.message
    };

    transporter.sendMail(mail_option, (error, info) => {
      if(error)
      {
        console.log(error);
      }
      else
      {
        response.redirect('/success');
      }
    });
  }
})

module.exports = {
    getHomePage,
    getContactPage,
    getAboutPage,
    sendEmailFunction
}
 