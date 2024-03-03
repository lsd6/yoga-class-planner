const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const teacherSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  personalDetails: {
    country: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    showContactDetails: { type: Boolean, default: true },
    phoneNumber: { type: String },
    displayPhoneNumber: { type: Boolean, default: true },
  }
});

// Hash password before saving to the database
teacherSchema.pre('save', async function(next) {
  try {
    // Check if the password has been modified or is new
    if (!this.isModified('password')) {
      return next();
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
});

// Method to compare passwords during login
teacherSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error; // Throw error if password comparison fails
  }
};

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
