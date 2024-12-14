const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all investors
router.get('/', async (req, res) => {
  try {
    const investors = await User.find({ type: 'investor' }).select('-password');
    res.json(investors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching investors' });
  }
});

// Get a specific investor
router.get('/:id', async (req, res) => {
  try {
    const investor = await User.findOne({ _id: req.params.id, type: 'investor' }).select('-password');
    if (!investor) {
      return res.status(404).json({ message: 'Investor not found' });
    }
    res.json(investor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching investor' });
  }
});

module.exports = router;
