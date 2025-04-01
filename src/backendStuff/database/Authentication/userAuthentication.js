import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Users.js";
import Feedback from "../Feedback.js";

const router = express.Router();

console.log("inside file!");

// Register Route
router.post("/register", async (req, res) => {

  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    console.log("running the request in userAuthentication.js");
    const { username, password } = req.body;

    // Ensure username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Retrieve user from database (Assuming you're using MongoDB with Mongoose)
    const user = await User.findOne({ username });
    
    // Check if the user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password); // Compare with stored hashed password
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

// feedback route

router.post("/feedback", async (req, res) => {
  try {

    const sanitizedData = {
      name: sanitizeHtml(req.body.name),
      email: sanitizeHtml(req.body.email),
      subject: sanitizeHtml(req.body.subject),
      message: sanitizeHtml(req.body.message),
    };

    const feedback = new Feedback(sanitizedData);
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (err) {
    console.error("Feedback error:", err);
    res.status(500).json({ message: "Failed to save feedback." });
  }
});

// update password

router.post("/changePassword", async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
