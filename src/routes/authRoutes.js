const express = require('express');
const authController = require('../controllers/authController');  // Import the controller
const router = express.Router();

// POST /register - User Registration
router.post('/register', authController.registerUser);  // Use controller function

// POST /login - User Login
router.post('/login', authController.loginUser);  // Use controller function

module.exports = router;