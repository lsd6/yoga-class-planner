const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher', 
    required: true
  },
  className: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  bookingDateTime: {
    type: Date,
    required: true
  },
  bookedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student' // Reference to the Student model
  }]
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
