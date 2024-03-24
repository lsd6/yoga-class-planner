const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

// Get all classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find().populate('teacher').populate('bookedStudents');
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a class
router.post('/', async (req, res) => {
  const classData = req.body;
  try {
    const teacher = await Teacher.findById(classData.teacher);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const newClass = new Class(classData);
    const savedClass = await newClass.save();

    res.status(201).json(savedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific class
router.get('/:id', getClass, (req, res) => {
  res.json(res.class);
});

// Middleware to get a specific class by ID
async function getClass(req, res, next) {
  let classItem;
  try {
    classItem = await Class.findById(req.params.id).populate('teacher').populate('bookedStudents');
    if (classItem === null) {
      return res.status(404).json({ message: 'Class not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.class = classItem;
  next();
}

// Update a class
router.patch('/:id', getClass, async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a class
router.delete('/:id', getClass, async (req, res) => {
  try {
    await res.class.remove();
    res.json({ message: 'Class deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
