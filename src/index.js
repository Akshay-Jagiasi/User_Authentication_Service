const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  // Import cors
const sequelize = require('./config/database'); // Import Sequelize config
const authRoutes = require('./routes/authRoutes');  // Import authRoutes
const profileRoutes = require('./routes/profileRoutes'); // Import profileRoutes
const adminRoutes = require('./routes/adminRoutes'); // Import adminRoutes


// Load environment variables from .env file
dotenv.config();


// Initialize the Express application
const app = express();


// Enable CORS for all origins (Can restrict this later if needed)
app.use(cors());


// Middleware
app.use(express.json());  // To parse JSON data


// Use authentication routes
app.use('/api/auth', authRoutes);


// Use profile routes
app.use('/api', profileRoutes);


// Use admin routes (admin access only)
app.use('/api', adminRoutes);


// Set the port from environment variables or default to 5000
const PORT = process.env.PORT;


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

