/**
 * emailService.js
 *
 * This service file contains the setup for sending emails using Node.js with the nodemailer package.
 * It provides functionality to send emails with dynamic content rendered using EJS templates.
 *
 * Key functionalities:
 * - Configure the email transport service using environment variables for secure email delivery.
 * - Render dynamic email content using EJS templates.
 * - Send emails with both plain text and HTML content.
 *
 * This service is essential for handling email notifications, user communications, and other
 * email-based functionalities within the application.
 */

const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

/**
 * Configures and sends an email using nodemailer and EJS for templating.
 * 
 * @param {Object} mailOptions - An object containing email sending options:
 *    @param {string} mailOptions.fromEmail - The sender's email address.
 *    @param {string} mailOptions.toEmail - The recipient's email address.
 *    @param {string} mailOptions.subject - The subject of the email.
 *    @param {string} mailOptions.text - The plain text version of the email content.
 *    @param {string} mailOptions.templatePath - The path to the EJS template file.
 *    @param {Object} mailOptions.templateData - The data to be injected into the EJS template.
 * @returns {Promise<Object>} - Returns information about the sent email if successful.
 * @throws {Error} - Throws an error if email sending fails.
 */

const setupMailer = async (mailOptions) => {

  //Using nodmailer.createTransport to setup the connection to the email receiver
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

// ///////
// Export
// ///////

module.exports = {
  setupMailer
};
