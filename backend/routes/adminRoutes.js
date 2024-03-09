// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const Joi = require('joi');
// const Admin = require('../models/Admin');

// // Joi schema for admin registration data
// const adminSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
// });

// // Admin registration route
// router.post('/register', async (req, res) => {
//   try {
//     // Validate request body against schema
//     const { error } = adminSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     const { email, password } = req.body;

//     // Check if admin already exists
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ error: 'Admin already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new admin
//     const newAdmin = new Admin({ email, password: hashedPassword });
//     await newAdmin.save();

//     res.status(201).json({ message: 'Admin registered successfully' });
//   } catch (error) {
//     console.error('Error registering admin:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Admin login route
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if email and password are provided
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     // Find the admin by email
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(404).json({ error: 'Admin not found' });
//     }

//     // Compare passwords
//     const isPasswordValid = await bcrypt.compare(password, admin.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // Return success message
//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Error logging in admin:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const Joi = require('joi');
// const Admin = require('../models/Admin');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');

// // Joi schema for admin registration data
// const adminSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
// });

// // Route for registering admin
// router.post('/register', async (req, res) => {
//   try {
//     // Validate request body against schema
//     const { error } = adminSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     const { email, password } = req.body;

//     // Check if admin already exists
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ error: 'Admin already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new admin
//     const newAdmin = new Admin({ email, password: hashedPassword });
//     await newAdmin.save();

//     res.status(201).json({ message: 'Admin registered successfully' });
//   } catch (error) {
//     console.error('Error registering admin:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route for requesting password reset for admin
// router.post('/forgot-password', async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Check if admin with given email exists
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(404).json({ error: 'Admin not found' });
//     }

//     // Generate unique password reset token
//     const token = crypto.randomBytes(20).toString('hex');
//     admin.resetPasswordToken = token;
//     admin.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
//     await admin.save();

//     // Send password reset email to admin
//     const transporter = nodemailer.createTransport({
//              service: 'Gmail',
//              auth: {
//               user: 'lakshmisowjanya212@gmail.com', // Your email address
//                pass: 'wmgy xptn wvgc pfmn' // Your email password or app password
//              }
//            });

//     const mailOptions = {
//       from: 'lakshmisowjanya212@gmail.com',
//       to: admin.email,
//       subject: 'Password Reset Request',
//       text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n`
//             + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
//             + `http://localhost:3000/reset-password/${token}\n\n`
//             + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Password reset instructions sent to your email' });
//   } catch (error) {
//     console.error('Error requesting password reset for admin:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route for resetting password for admin
// router.post('/reset-password', async (req, res) => {
//   try {
//     const { token, newPassword } = req.body;

//     // Find admin by reset password token
//     const admin = await Admin.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
//     if (!admin) {
//       return res.status(400).json({ error: 'Password reset token is invalid or has expired' });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
    
//     // Update admin's password and reset token fields
//     admin.password = hashedPassword;
//     admin.resetPasswordToken = undefined;
//     admin.resetPasswordExpires = undefined;
//     await admin.save();

//     res.status(200).json({ message: 'Password reset successful' });
//   } catch (error) {
//     console.error('Error resetting password for admin:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route for admin login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if email and password are provided
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     // Find the admin by email
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(404).json({ error: 'Admin not found' });
//     }

//     // Compare passwords
//     const isPasswordValid = await bcrypt.compare(password, admin.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // Return success message
//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Error logging in admin:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const Admin = require('../models/Admin');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Joi schema for admin registration data
const adminSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  resetPasswordToken: Joi.string().allow(null), // Allow null value or string for resetPasswordToken
  resetPasswordExpires: Joi.date().allow(null) // Allow null value or date for resetPasswordExpires
});


// Route for registering admin
 router.post('/register', async (req, res) => {
   try {
     // Validate request body against schema
     const { error } = adminSchema.validate(req.body);
     if (error) {
       return res.status(400).json({ error: error.details[0].message });
     }

     const { email, password } = req.body;

     // Check if admin already exists
     const existingAdmin = await Admin.findOne({ email });
     if (existingAdmin) {
       return res.status(400).json({ error: 'Admin already exists' });
     }

     // Hash the password
     const hashedPassword = await bcrypt.hash(password, 10);

     // Create a new admin
     const newAdmin = new Admin({ email, password: hashedPassword });
     await newAdmin.save();

     res.status(201).json({ message: 'Admin registered successfully' });
   } catch (error) {
     console.error('Error registering admin:', error);
     res.status(500).json({ error: 'Internal server error' });
   }
 });
// Route for requesting password reset for admin
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if admin with given email exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Generate unique password reset token
    const token = crypto.randomBytes(20).toString('hex');
    admin.resetPasswordToken = token;
    admin.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await admin.save();

    // Send password reset email to admin
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'lakshmisowjanya212@gmail.com', // Your email address
        pass: 'wmgy xptn wvgc pfmn' // Your email password or app password
      }
    });

    const mailOptions = {
      from: 'lakshmisowjanya212@gmail.com',
      to: admin.email,
      subject: 'Password Reset Request',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n`
            + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
            + `http://localhost:3000/reset-password/${token}\n\n`
            + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset instructions sent to your email' });
  } catch (error) {
    console.error('Error requesting password reset for admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for resetting password for admin
 router.post('/reset-password', async (req, res) => {
   try {
     const { token, newPassword } = req.body;

     // Find admin by reset password token
     const admin = await Admin.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
     if (!admin) {
       return res.status(400).json({ error: 'Password reset token is invalid or has expired' });
     }

     // Hash the new password
     const hashedPassword = await bcrypt.hash(newPassword, 10);
    
     // Update admin's password and reset token fields
     admin.password = hashedPassword;
     admin.resetPasswordToken = undefined;
     admin.resetPasswordExpires = undefined;
     await admin.save();

     res.status(200).json({ message: 'Password reset successful' });
   } catch (error) {
     console.error('Error resetting password for admin:', error);
     res.status(500).json({ error: 'Internal server error' });
   }
 });

// Route for admin login
 router.post('/login', async (req, res) => {
   try {
     const { email, password } = req.body;

     // Check if email and password are provided
     if (!email || !password) {
       return res.status(400).json({ error: 'Email and password are required' });
     }

     // Find the admin by email
     const admin = await Admin.findOne({ email });
     if (!admin) {
       return res.status(404).json({ error: 'Admin not found' });
     }

     // Compare passwords
     const isPasswordValid = await bcrypt.compare(password, admin.password);
     if (!isPasswordValid) {
       return res.status(401).json({ error: 'Invalid email or password' });
     }

     // Return success message
     res.status(200).json({ message: 'Login successful' });
   } catch (error) {
     console.error('Error logging in admin:', error);
     res.status(500).json({ error: 'Internal server error' });
  }
 });

 module.exports = router;
