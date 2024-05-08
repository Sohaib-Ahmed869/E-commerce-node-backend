const express = require("express");
const router = express.Router();
const Contact = require("../Model/contact");

//get
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.json({ message: err });
  }
});

//post
router.post("/", async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  try {
    const savedContact = await contact.save();
    res.json(savedContact);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;