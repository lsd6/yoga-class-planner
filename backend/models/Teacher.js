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
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
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
    next(error);
  }
});

// Method to compare passwords
teacherSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    console.log('Comparing passwords...');
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('Password comparison result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;