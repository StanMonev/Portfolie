const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const setupMailer = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_HOST_PORT,
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const data = await ejs.renderFile(mailOptions.templatePath, mailOptions.templateData);

  const mail_option = {
    from: mailOptions.fromEmail,
    to: mailOptions.toEmail,
    subject: mailOptions.subject,
    text: mailOptions.text,
    html: data
  };

  transporter.sendMail(mail_option, (error, info) => {
    if (error) {
      throw new Error(error.message);
    }
    return info;
  });
};

module.exports = {
  setupMailer
};
