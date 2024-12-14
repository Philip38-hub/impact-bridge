const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Startup Registration
router.post('/signup/startup', async (req, res) => {
  try {
    console.log('Startup registration attempt:', req.body);
    const { 
      email, 
      password, 
      name, 
      startupName,
      founderName,
      industry,
      description,
      fundingNeeded,
      revenue,
      valuation,
      phone,
      linkedin,
      facebook,
      whatsapp,
      zoomId
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log('User found:', existingUser ? 'Yes' : 'No');

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new startup user with plain password
    // Password will be hashed by the pre-save hook
    const user = await User.create({
      email,
      password,
      name,
      startupName,
      founderName,
      industry,
      description,
      fundingNeeded,
      revenue,
      valuation,
      phone,
      linkedin,
      facebook,
      whatsapp,
      zoomId,
      type: 'startup'
    });

    console.log('User created successfully');

    // Generate token
    const token = jwt.sign(
      { userId: user._id, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data without password
    const userData = {
      id: user._id,
      email: user.email,
      type: user.type,
      name: user.name,
      startupName: user.startupName,
      founderName: user.founderName,
      industry: user.industry,
      description: user.description,
      fundingNeeded: user.fundingNeeded,
      revenue: user.revenue,
      valuation: user.valuation,
      phone: user.phone,
      linkedin: user.linkedin,
      facebook: user.facebook,
      whatsapp: user.whatsapp,
      zoomId: user.zoomId
    };

    console.log('Startup registration successful, returning:', { token, user: userData });

    res.status(201).json({
      token,
      user: userData
    });
  } catch (error) {
    console.error('Startup registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Investor Registration
router.post('/signup/investor', async (req, res) => {
  try {
    console.log('Investor registration attempt:', req.body); // Debug log
    const { 
      email, 
      password, 
      name,
      investmentPreferences,
      portfolioSize,
      interests 
    } = req.body;

    const existingUser = await User.findOne({ email });
    console.log('User found:', existingUser ? 'Yes' : 'No'); // Debug log

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new investor user with plain password
    // Password will be hashed by the pre-save hook
    const user = await User.create({
      email,
      password,
      name,
      investmentPreferences,
      portfolioSize,
      interests,
      type: 'investor'
    });

    const token = jwt.sign(
      { userId: user._id, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data without password
    const userData = {
      id: user._id,
      email: user.email,
      type: user.type,
      name: user.name,
      investmentPreferences: user.investmentPreferences || [],
      portfolioSize: user.portfolioSize || 0,
      interests: user.interests || []
    };

    console.log('Investor registration successful, returning:', { token, user: userData }); // Debug log

    res.status(201).json({
      token,
      user: userData
    });
  } catch (error) {
    console.error('Investor registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    // Find user with all fields
    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Debug log user data
    console.log('User data:', {
      email: user.email,
      type: user.type,
      hasPassword: !!user.password
    });

    // Use the User model's comparePassword method
    const isMatch = await user.comparePassword(password);
    console.log('Password comparison result:', isMatch);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Prepare user data based on type
    const userData = {
      id: user._id,
      email: user.email,
      type: user.type,
      name: user.name
    };

    if (user.type === 'startup') {
      Object.assign(userData, {
        startupName: user.startupName,
        founderName: user.founderName,
        industry: user.industry,
        description: user.description,
        fundingNeeded: user.fundingNeeded,
        revenue: user.revenue || 0,
        valuation: user.valuation || 0,
        phone: user.phone,
        linkedin: user.linkedin,
        facebook: user.facebook,
        whatsapp: user.whatsapp,
        zoomId: user.zoomId
      });
    } else if (user.type === 'investor') {
      Object.assign(userData, {
        investmentPreferences: user.investmentPreferences || [],
        portfolioSize: user.portfolioSize || 0,
        interests: user.interests || []
      });
    }

    console.log('Login successful, returning:', { token, user: userData });

    res.json({
      token,
      user: userData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

// Google OAuth
router.post('/google', async (req, res) => {
  try {
    console.log('Google auth attempt:', req.body); // Debug log
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        email,
        name,
        type: 'startup', // Default type for Google sign-in
        googleId: payload.sub
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Prepare user data
    const userData = {
      id: user._id,
      email: user.email,
      type: user.type,
      name: user.name
    };

    // Add type-specific fields
    if (user.type === 'startup') {
      Object.assign(userData, {
        startupName: user.name,
        founderName: user.founderName,
        industry: user.industry,
        description: user.description,
        fundingNeeded: user.fundingNeeded,
        revenue: user.revenue || 0,
        valuation: user.valuation || 0,
        phone: user.phone,
        linkedin: user.linkedin,
        facebook: user.facebook,
        whatsapp: user.whatsapp,
        zoomId: user.zoomId
      });
    } else {
      Object.assign(userData, {
        investmentPreferences: user.investmentPreferences || [],
        portfolioSize: user.portfolioSize || 0,
        interests: user.interests || []
      });
    }

    console.log('Google auth successful, returning:', { token, user: userData }); // Debug log

    res.json({ token, user: userData });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ message: 'Google authentication failed' });
  }
});

module.exports = router;
