const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Pre-save hook to hash password before saving to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Skip if password is not modified

  try {
    console.log('Hashing password...'); // Debug log
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    console.log('Password hashed:', this.password); // Debug log
    next(); // Proceed with saving the user
  } catch (error) {
    next(error); // Handle any errors
  }
});

module.exports = mongoose.model('User', userSchema);
