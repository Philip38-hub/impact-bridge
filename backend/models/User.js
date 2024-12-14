const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password is required only if not using Google auth
    },
  },
  googleId: {
    type: String,
    sparse: true,
  },
  userType: {
    type: String,
    enum: ['startup', 'investor'],
    required: true,
  },
  startupName: {
    type: String,
    required: function() {
      return this.userType === 'startup';
    }
  },
  founderName: {
    type: String,
    required: function() {
      return this.userType === 'startup';
    }
  },
  name: {
    type: String,
    required: function() {
      return this.userType === 'investor';
    }
  },
  industry: {
    type: String,
    required: function() {
      return this.userType === 'startup';
    }
  },
  description: {
    type: String,
    required: function() {
      return this.userType === 'startup';
    }
  },
  fundingNeeded: {
    type: String,
    required: function() {
      return this.userType === 'startup';
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
