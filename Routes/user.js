const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../Model/user"); // Replace with your user model path (if applicable)

// Signup route (POST request)
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (User) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
  }

  // Create a new user (if using database)
  let newUser;
  if (User) {
    newUser = new User({
      username,
      email,
      password,
    });
  } else {
    // Handle user object creation without database persistence
  }

  // Save user or handle success (if using database)
  if (User) {
    try {
      const savedUser = await newUser.save();
      return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    // Handle user object creation success without database persistence
    return res.status(201).json({ message: "User created successfully" });
  }
});

// Login route (POST request)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user by email (if using database)
  let user;
  if (User) {
    user = await User.findOne({ email });
  } else {
    // Handle user lookup without database persistence (replace with your logic)
  }

  // Check if user exists
  if (!user) {
    console.log("User not found");
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Check if password is correct
  if (User) {
    const validPassword = password === user.password ? true : false;
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  }

  // Generate JWT token (optional, replace with your authentication mechanism)
  const token = jwt.sign({ email: user.email, _id:user._id }, "secret", {
    expiresIn: "1h",
  });
  // Login success response
  console.log("Login successful");
  return res.status(200).json({ message: "Login successful", token });
});

module.exports = router;
