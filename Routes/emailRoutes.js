// emailRoutes.js
const express = require('express');
const { sendEmail } = require('../Controllers/NodeMailer');

const router = express.Router();

router.post('/send', sendEmail);

module.exports = router;