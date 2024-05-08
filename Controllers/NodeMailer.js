// emailController.js

const sendMailUsingSMTP = require('../Services/nodeMailerService');

const sendEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    await sendMailUsingSMTP(email, otp);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

module.exports = { sendEmail };
