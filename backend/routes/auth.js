const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Startup Registration
router.post('/signup/startup', async (req, res) => {
  try {
    const { 
      email, 
      password, 
      startupName, 
      founderName,
      industry,
      description,
      fundingNeeded 
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new startup user
    const user = await User.create({
      email,
      password,
      startupName,
      founderName,
      industry,
      description,
      fundingNeeded,
      userType: 'startup'
    });

    // Generate token
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ token, userType: user.userType });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message || 'Server error during registration' });
  }
});

// Investor Registration
router.post('/signup/investor', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new investor user
    const user = await User.create({
      email,
      password,
      name,
      userType: 'investor'
    });

    // Generate token
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ token, userType: user.userType });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message || 'Server error during registration' });
  }
});

// Regular login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, userType: user.userType });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Google login
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      // For demo purposes, randomly assign user type
      // In production, you should ask the user to select their type
      const userType = Math.random() < 0.5 ? 'startup' : 'investor';
      
      user = await User.create({
        email,
        name,
        googleId,
        userType,
      });
    }

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, userType: user.userType });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Server error during Google login' });
  }
});

module.exports = router;
