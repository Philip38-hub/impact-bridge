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

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

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

    const token = jwt.sign(
      { userId: user._id, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

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

    res.status(201).json({
      token,
      user: userData
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Investor Registration
router.post('/signup/investor', async (req, res) => {
  try {
    const { 
      email, 
      password, 
      name,
      investmentPreferences,
      portfolioSize,
      interests 
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

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

    const userData = {
      id: user._id,
      email: user.email,
      type: user.type,
      name: user.name,
      investmentPreferences: user.investmentPreferences || [],
      portfolioSize: user.portfolioSize || 0,
      interests: user.interests || []
    };

    res.status(201).json({
      token,
      user: userData
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

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

    res.json({
      token,
      user: userData
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

// Google OAuth
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({
        email,
        name,
        type: 'startup',
        googleId: payload.sub
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const userData = {
      id: user._id,
      email: user.email,
      type: user.type,
      name: user.name
    };

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

    res.json({ token, user: userData });
  } catch (error) {
    res.status(401).json({ message: 'Google authentication failed' });
  }
});

module.exports = router;
