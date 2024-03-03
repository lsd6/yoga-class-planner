// backend/routes/protectedRoutes.js

const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeUser } = require('../middleware/authMiddleware');

router.get('/admin/dashboard', authenticateUser, authorizeUser('admin'), (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

router.get('/teacher/dashboard', authenticateUser, authorizeUser('teacher'), (req, res) => {
  res.json({ message: 'Welcome to the teacher dashboard' });
});

router.get('/student/dashboard', authenticateUser, authorizeUser('student'), (req, res) => {
  res.json({ message: 'Welcome to the student dashboard' });
});

module.exports = router;
