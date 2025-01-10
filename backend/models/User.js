const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
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
  },
  type: {
    type: String,
    enum: ['investor', 'startup'],
    required: true
  },
  interests: {
    type: [String],
    default: []
  },
  organization: String,
  position: String,
  description: String,
  impactAreas: [String],
  industry: String,
  businessModel: String,
  businessStage: String,
  location: String,
  minimumInvestment: Number,
  maximumInvestment: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
