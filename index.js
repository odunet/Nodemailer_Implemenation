// Sends email using the zuriMail module and Mail Trap
const express = require('express');
const path = require('path');
const { sendMail, options } = require('./zuriMailTraining');

let app = express();
var router = express.Router();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).json({
    data:
      'I am the best, the post endpoint is used to send email using zuriMailTraining module',
  });
});
app.get('/form', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/api', async (req, res) => {
  options.subject = req.body.subject;
  options.email = req.body.email;
  try {
    let info = await sendMail(options);
    res.status(200).json({ Status: 'Sent', Info: info });
  } catch (e) {
    res.status(504).json({ Status: 'Not Sent', Error: e });
  }
});

app.use('/api', router);
app.use(function (req, res, next) {
  console.log('Time of request:', Date.now());
  next();
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
