const express = require('express');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// GET /profile - Retrieve user profile (protected)
router.get('/profile', authMiddleware, profileController.getProfile);

module.exports = router;
