const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile'); // Import Profile model if needed

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: No token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store decoded token data in request object
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({
      success: false,
      message: 'Unauthorized: Invalid token',
    });
  }
};

// GET user data endpoint
router.get(`/api/users`, verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user id from decoded token
    const user = await User.findById(userId).populate('additionalDetails');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Exclude sensitive information from response
    const { password, token, ...userData } = user._doc;

    res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user data',
    });
  }
});

module.exports = router;
