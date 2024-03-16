// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const Joi = require('joi');
// const Teacher = require('../models/Teacher');
// const multer = require('multer');
// const path = require('path');

// // Joi schema for teacher registration data
// const teacherSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
//   confirmPassword: Joi.string().required(), // Add confirmPassword to the schema
//   personalDetails: Joi.object({
//     country: Joi.string().required(),
//     name: Joi.string().required(),
//     address: Joi.string().required(),
//     city: Joi.string().required(),
//     state: Joi.string().required(),
//     postalCode: Joi.string().required(),
//     showContactDetails: Joi.boolean(),
//     phoneNumber: Joi.string(),
//     displayPhoneNumber: Joi.boolean(),
//     bio: Joi.string(), // Add bio field to the schema
//     certificates: Joi.array().items(Joi.string()) // Add certificates field to the schema
//   }).required(),
// });

// // File upload configuration using Multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + '-' + Date.now() + ext);
//   }
// });
// const upload = multer({ storage: storage });

// // Teacher registration route with file upload
// router.post('/register', upload.single('image'), async (req, res) => {
//   try {
//     // Validate request body
//     const { error } = teacherSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     // Check if email already exists
//     const { email, password, personalDetails, bio, certificates } = req.body;
//     const existingTeacher = await Teacher.findOne({ email });
//     if (existingTeacher) {
//       return res.status(400).json({ error: 'Teacher with this email already exists' });
//     }

//     // Save image path to teacher model if an image was uploaded
//     let imageUrl;
//     if (req.file) {
//       imageUrl = req.file.path; // Assuming Multer is configured to save to 'uploads/' directory
//     }

//     // Create new teacher instance
//     const newTeacher = new Teacher({ email, password, personalDetails, image: imageUrl, bio, certificates });
//     await newTeacher.save();

//     res.status(201).json({ message: 'Teacher registered successfully' });
//   } catch (error) {
//     console.error('Error registering teacher:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// // Teacher login route
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if email and password are provided
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     // Find the teacher by email
//     const teacher = await Teacher.findOne({ email });
//     if (!teacher) {
//       return res.status(404).json({ error: 'Teacher not found' });
//     }

//     // Compare passwords
//     const isPasswordValid = await teacher.comparePassword(password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // Return success message
//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Error logging in teacher:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Forgot password route
// router.post('/forgot-password', async (req, res) => {
//   try {
//     const { email } = req.body;
//     const teacher = await Teacher.findOne({ email });

//     if (!teacher) {
//       return res.status(404).json({ error: 'Teacher not found' });
//     }

//     // Generate a unique token for password reset (you can use a library like `crypto` for this)
//     const resetToken = generateResetToken(); // Implement this function

//     // Save the reset token to the teacher document in the database
//     teacher.resetPasswordToken = resetToken;
//     teacher.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
//     await teacher.save();

//     // Send password reset email to the teacher
//     await sendPasswordResetEmail(teacher.email, resetToken);

//     res.status(200).json({ message: 'Password reset email sent successfully' });
//   } catch (error) {
//     console.error('Error sending password reset email:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Get teacher details route
// router.get('/:id', async (req, res) => {
//   try {
//     const teacherId = req.params.id;
//     const teacher = await Teacher.findById(teacherId);
//     if (!teacher) {
//       return res.status(404).json({ error: 'Teacher not found' });
//     }
//     res.status(200).json({ teacher });
//   } catch (error) {
//     console.error('Error getting teacher details:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Update teacher details route
// router.put('/:id', async (req, res) => {
//   try {
//     const teacherId = req.params.id;
//     const updatedDetails = req.body;
//     const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, updatedDetails, { new: true });
//     if (!updatedTeacher) {
//       return res.status(404).json({ error: 'Teacher not found' });
//     }
//     res.status(200).json({ message: 'Teacher details updated successfully', teacher: updatedTeacher });
//   } catch (error) {
//     console.error('Error updating teacher details:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const Teacher = require('../models/Teacher');
const multer = require('multer');
const path = require('path');

// Joi schema for teacher registration data
const teacherSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(), // Add confirmPassword to the schema
  personalDetails: Joi.object({
    country: Joi.string().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    showContactDetails: Joi.boolean(),
    phoneNumber: Joi.string(),
    displayPhoneNumber: Joi.boolean(),
    bio: Joi.string(), // Add bio field to the schema
    certificates: Joi.array().items(Joi.string()) // Add certificates field to the schema
  }).required(),
});

// File upload configuration using Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});
const upload = multer({ storage: storage });

// Teacher registration route with file upload
router.post('/register', upload.single('image'), async (req, res) => {
  try {
    // Validate request body
    const { error } = teacherSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if email already exists
    const { email, password, personalDetails, bio, certificates } = req.body;
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ error: 'Teacher with this email already exists' });
    }

    // Save image path to teacher model if an image was uploaded
    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path; // Assuming Multer is configured to save to 'uploads/' directory
    }

    // Create new teacher instance
    const newTeacher = new Teacher({ email, password, personalDetails, image: imageUrl, bio, certificates });
    await newTeacher.save();

    res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (error) {
    console.error('Error registering teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Teacher login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find the teacher by email
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    // Compare passwords
    const isPasswordValid = await teacher.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Return success message
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Forgot password route
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    // Generate a unique token for password reset (you can use a library like `crypto` for this)
    const resetToken = generateResetToken(); // Implement this function

    // Save the reset token to the teacher document in the database
    teacher.resetPasswordToken = resetToken;
    teacher.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await teacher.save();

    // Send password reset email to the teacher
    await sendPasswordResetEmail(teacher.email, resetToken);

    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get teacher details route
router.get('/:id', async (req, res) => {
  try {
    const teacherId = req.params.id;
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(200).json({ teacher });
  } catch (error) {
    console.error('Error getting teacher details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update teacher details route
router.put('/:id', async (req, res) => {
  try {
    const teacherId = req.params.id;
    const updatedDetails = req.body;
    const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, updatedDetails, { new: true });
    if (!updatedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher details updated successfully', teacher: updatedTeacher });
  } catch (error) {
    console.error('Error updating teacher details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
