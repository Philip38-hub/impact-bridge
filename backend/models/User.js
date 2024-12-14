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
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['startup', 'investor'],
    required: true,
  },
  // Startup specific fields
  startupName: {
    type: String,
    required: function() {
      return this.type === 'startup';
    }
  },
  founderName: {
    type: String,
    required: function() {
      return this.type === 'startup';
    }
  },
  industry: {
    type: String,
    required: function() {
      return this.type === 'startup';
    }
  },
  businessModel: {
    type: String,
    required: function() {
      return this.type === 'startup';
    }
  },
  businessStage: {
    type: String,
    required: function() {
      return this.type === 'startup';
    }
  },
  location: {
    type: String,
    required: function() {
      return this.type === 'startup';
    }
  },
  description: {
    type: String,
    required: function() {
      return this.type === 'startup';
    }
  },
  impactToSociety: {
    type: String,
    required: function() {
      return this.type === 'startup';
    }
  },
  partners: {
    type: String,
    required: false
  },
  referees: {
    type: String,
    required: false
  },
  fundingNeeded: {
    type: Number,
    required: function() {
      return this.type === 'startup';
    }
  },
  revenue: {
    type: Number,
    default: 0
  },
  valuation: {
    type: Number,
    default: 0
  },
  // Contact fields
  phone: {
    type: String
  },
  linkedin: {
    type: String
  },
  facebook: {
    type: String
  },
  whatsapp: {
    type: String
  },
  zoomId: {
    type: String
  },
  // Investor specific fields
  organization: {
    type: String,
    required: function() {
      return this.type === 'investor';
    }
  },
  position: {
    type: String,
    required: function() {
      return this.type === 'investor';
    }
  },
  minInvestment: {
    type: Number,
    required: function() {
      return this.type === 'investor';
    }
  },
  maxInvestment: {
    type: Number,
    required: function() {
      return this.type === 'investor';
    }
  },
  investmentPreferences: [{
    type: String,
    default: []
  }],
  portfolioSize: {
    type: Number,
    default: 0
  },
  interests: [{
    type: String,
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
