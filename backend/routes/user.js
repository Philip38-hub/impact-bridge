const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    console.log('Fetching profile for user:', req.user.userId); // Debug log
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      console.log('User not found'); // Debug log
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User profile found:', user); // Debug log
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    console.log('Updating profile for user:', req.user.userId); // Debug log
    console.log('Update data:', req.body); // Debug log

    const updates = req.body;
    delete updates.password; // Don't allow password updates through this route
    delete updates.type; // Don't allow type changes
    delete updates.email; // Don't allow email changes

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      console.log('User not found for update'); // Debug log
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User profile updated:', user); // Debug log
    res.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
