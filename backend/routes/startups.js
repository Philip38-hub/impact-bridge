const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all startups with optional filtering
router.get('/', auth, async (req, res) => {
  try {
    const query = { type: 'startup' };
    
    // Add industry filter if specified
    if (req.query.industry) {
      query.industry = req.query.industry;
    }

    // Add funding range filter if specified
    if (req.query.minFunding || req.query.maxFunding) {
      query.fundingNeeded = {};
      if (req.query.minFunding) {
        query.fundingNeeded.$gte = parseInt(req.query.minFunding);
      }
      if (req.query.maxFunding) {
        query.fundingNeeded.$lte = parseInt(req.query.maxFunding);
      }
    }

    const startups = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 }); // Most recent first

    // Add a flag for matching investor interests
    if (req.user && req.user.type === 'investor') {
      const investor = await User.findById(req.user.userId).select('interests');
      if (investor && investor.interests) {
        startups.forEach(startup => {
          startup._doc.matchesInterests = investor.interests.includes(startup.industry);
        });
      }
    }

    res.json(startups);
  } catch (error) {
    console.error('Error fetching startups:', error);
    res.status(500).json({ message: 'Error fetching startups' });
  }
});

// Get a specific startup
router.get('/:id', auth, async (req, res) => {
  try {
    const startup = await User.findOne({ 
      _id: req.params.id, 
      type: 'startup' 
    }).select('-password');
    
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    // Add matching info for investors
    if (req.user && req.user.type === 'investor') {
      const investor = await User.findById(req.user.userId).select('interests');
      if (investor && investor.interests) {
        startup._doc.matchesInterests = investor.interests.includes(startup.industry);
      }
    }

    res.json(startup);
  } catch (error) {
    console.error('Error fetching startup:', error);
    res.status(500).json({ message: 'Error fetching startup' });
  }
});

module.exports = router;
