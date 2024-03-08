// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const Joi = require('joi');
// const Student = require('../models/Student');

// // Joi schema for student registration data
// const studentSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
// });

// // Student registration route
// router.post('/register', async (req, res) => {
//   try {
//     // Validate request body against schema
//     const { error } = studentSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     const { name, email, password } = req.body;

//     // Check if student already exists
//     const existingStudent = await Student.findOne({ email });
//     if (existingStudent) {
//       return res.status(400).json({ error: 'Student already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new student
//     const newStudent = new Student({ name, email, password: hashedPassword });
//     await newStudent.save();
    
//     res.status(201).json({ message: 'Student registered successfully' });
//   } catch (error) {
//     console.error('Error registering student:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Student login route
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     // Find the student by email
//     const student = await Student.findOne({ email });
//     if (!student) {
//       return res.status(404).json({ error: 'Student not found' });
//     }

//     // Compare passwords
//     const isPasswordValid = await bcrypt.compare(password, student.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // Return success message
//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Error logging in student:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const Student = require('../models/Student');

// Joi schema for student registration data
const studentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
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

module.exports = router;
