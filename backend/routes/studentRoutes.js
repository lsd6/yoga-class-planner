const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const Student = require('../models/Student');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Joi schema for student registration data
const studentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  resetPasswordToken: Joi.string().allow(null), // Allow null value or string for resetPasswordToken
  resetPasswordExpires: Joi.date().allow(null) // Allow null value or date for resetPasswordExpires
});

// Student registration route
router.post('/register', async (req, res) => {
  try {
    // Validate request body against schema
    const { error } = studentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, password } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student
    const newStudent = new Student({ name, email, password: hashedPassword });
    await newStudent.save();
    
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Student login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find the student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Return success message along with student role
    res.status(200).json({ message: 'Login successful', role: 'student' });
  } catch (error) {
    console.error('Error logging in student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Forgot password route
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Generate unique password reset token
    const token = crypto.randomBytes(20).toString('hex');
    student.resetPasswordToken = token;
    student.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await student.save();

    // Send password reset email to student
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'lakshmisowjanya212@gmail.com', // Your email address
        pass: 'wmgy xptn wvgc pfmn' // Your email password or app password
      }
    });
    const mailOptions = {
      from: 'lakshmisowjanya212@gmail.com',
      to: student.email, // Sending email to student's email address
      subject: 'Password Reset Request',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n`
            + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
            + `http://localhost:3000/reset-password/${token}\n\n`
            + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Joi schema for resetting student password data
const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().required(),
});

// Reset password route for students
router.post('/reset-password', async (req, res) => {
  try {
    // Validate request body against schema
    const { error } = resetPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { token, newPassword } = req.body;

    // Find student by reset password token
    const student = await Student.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    console.log('Retrieved student:', student);

    if (!student) {
      return res.status(400).json({ error: 'Password reset token is invalid or has expired' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update student's password and reset token fields
    student.password = hashedPassword;
    student.resetPasswordToken = undefined;
    student.resetPasswordExpires = undefined;
    await student.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password for student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to fetch details of all registered students
router.get('/', async (req, res) => {
  try {
    // Fetch all students from the database
    const students = await Student.find({}, { password: 0 }); // Exclude password field
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
