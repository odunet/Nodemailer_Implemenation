const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure transporter
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.PASSWORD,
    pass: process.env.EMAIL,
  },
});

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

// Set mail options
let mailOptions = {
  from: process.env.PASSWORD,
  to: 'odunet2000@yahoo.com',
  subject: 'Testing Nodemailer Plain',
  text: 'Hello World',
  html: output,
  attachments: [
    {
      filename: 'TriePicture.jpg',
      path: 'https://i.ibb.co/Csq3vKw/trie.png',
    },
  ],
};

// Send email
transporter
  .sendMail(mailOptions)
  .then((data) => {
    console.log('Message Sent');
  })
  .catch((err) => {
    console.log('Error');
  });
