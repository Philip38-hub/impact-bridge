const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get featured investors (public endpoint)
router.get('/featured', async (req, res) => {
  try {
    const investors = await User.find({ 
      type: 'investor',
      // Add any criteria for featuring investors
      // For example: verified: true
    })
    .select('-password -email') // Extra privacy for investors
    .sort({ createdAt: -1 })
    .limit(6); // Limit to 6 featured investors

    res.json(investors);
  } catch (error) {
    console.error('Error fetching featured investors:', error);
    res.status(500).json({ message: 'Error fetching featured investors' });
  }
});

// Get all investors
router.get('/', auth, async (req, res) => {
  try {
    const investors = await User.find({ type: 'investor' }).select('-password');
    res.json(investors);
  } catch (error) {
    console.error('Error fetching investors:', error);
    res.status(500).json({ message: 'Error fetching investors' });
  }
});

// Get a specific investor
router.get('/:id', auth, async (req, res) => {
  try {
    const investor = await User.findOne({ _id: req.params.id, type: 'investor' }).select('-password');
    if (!investor) {
      return res.status(404).json({ message: 'Investor not found' });
    }
    res.json(investor);
  } catch (error) {
    console.error('Error fetching investor:', error);
    res.status(500).json({ message: 'Error fetching investor' });
  }
});

module.exports = router;
