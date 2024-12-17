const User = require('../models/user');

// Controller to retrieve user profile
const getProfile = async (req, res) => {
    try {
        // Get user ID from the JWT payload (attached by the middleware)
        const userId = req.user.userId;

        // Find user by ID (exclude sensitive data like password) //findpk : Search for a single instance by its primary key
        const user = await User.findByPk(userId, {
            attributes: ['id', 'username', 'email', 'role'], // Only include required fields
        });

        // If user not found, send an error response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send user profile as the response
        res.status(200).json(user);
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getProfile,
};