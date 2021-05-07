// Sends email using the zuriMail module and Mail Trap
const express = require('express');
const { sendMail, options } = require('./zuriMailTraining');

let app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res
    .status(200)
    .json({
      data:
        'I am the best, the post endpoint is used to send email using zuriMailTraining module',
    });
});

app.post('/', async (req, res) => {
  options.subject = req.body.subject;
  options.email = req.body.email;
  try {
    let info = await sendMail(options);
    res.status(200).json({ Status: 'Sent', Info: info });
  } catch (e) {
    res.status(504).json({ Status: 'Not Sent', Error: e });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
