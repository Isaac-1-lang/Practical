const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  position: {
    type: String,
  },
  company: {
    type: String,
  },
  businessArena: {
    type: String,
  },
  employees: {
    type: String,
  },
  streetNr: {
    type: String,
    required: true
  },
  additionalInformation: {
    type: String,
  },
  zipCode: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  code: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 