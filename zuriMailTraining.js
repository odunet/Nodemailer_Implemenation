const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendMail(options) {
  // Configure transporter with MailTrap Config
  let transporter = nodemailer.createTransport({
    host: process.env.MAILTRAPHOST,
    port: parseInt(process.env.MAILTRAPPORT),
    auth: {
      user: process.env.MAILTRAPUSER,
      pass: process.env.MAILTRAPPW,
    },
  });

  // Set mail options
  let mailOptions = {
    from: `Ayokunle O <${process.env.PASSWORD}>`,
    to: options.email,
    subject: options.subject,
    html: options.data,
  };

  // Send email
  try {
    let info = await transporter.sendMail(mailOptions);
    return info;
  } catch (e) {
    return e;
  }
}

//Define HTML Object
let output = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="text-align: center; color:blueviolet">
    <h1>Sample Email</h1>
    <p1>From the <strong>Boss</strong> himself</p1>
    <input id='ayoButton' type="button" value="Submit" name="submit">
    <a href="www.google.com">Google<a>
</body>
<script>
    let ayoButton = document.getElementById('ayoButton')
    ayoButton.addEventListener('click', (e) =>{
        preventDefault();
    })
</script>
</html>`;

// Define options
let options = {
  email: process.env.TOEMAIL,
  data: output,
  subject: 'Contact us Here',
};

// sendMail(options);

module.exports = { sendMail, options };
