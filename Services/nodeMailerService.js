// emailService.js

const { createTransport } = require('nodemailer');
const password = process.env.REACT_APP_SMTP_PASSWORD;
const email_Host = process.env.REACT_APP_SMTP_EMAIL;

const sendMailUsingSMTP = async (email, OTP) => {
    const transporter = createTransport({
        service: 'gmail',   
        auth: {
          user: "sohaibsipra869@gmail.com",
          pass: "xeri feke fkog scdn"
        }
      });

    const mailOptions = {
        from: email_Host,
        to: email,
        subject: 'OTP for email verification',
        text: `Your OTP is ${OTP}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendMailUsingSMTP;