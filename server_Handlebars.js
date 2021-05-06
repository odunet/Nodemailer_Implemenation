const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
require('dotenv').config();

const path = require('path');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.PASSWORD,
    pass: process.env.EMAIL,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: '.handlebars',
    partialsDir: path.resolve(__dirname, 'views'),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, 'views'),
  extName: '.handlebars',
};

transporter.use('compile', hbs(handlebarOptions));

var mailOptions = {
  from: process.env.PASSWORD,
  to: 'odunet2000@yahoo.com',
  subject: 'Testing NodeMailer Handlebar',
  template: 'index', //Any template stored in viewPath
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    // Use only in express
    // res.send({
    //   status: 'success',
    //   data: 'Reset Link sent successfully',
    // });

    console.log('Email sent: ' + info.response);
  }
});
