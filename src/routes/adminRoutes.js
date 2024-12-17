const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');  // Middleware for JWT validation
const isAdmin = require('../middleware/isAdmin');  // Middleware for role-based access control
const adminController = require('../controllers/adminController');  // Admin controller

const router = express.Router();

// GET /admin - Only accessible by admins
router.get('/admin', authMiddleware, isAdmin, adminController.getAllUsers);

module.exports = router;
