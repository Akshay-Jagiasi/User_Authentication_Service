const User = require('../models/user');

// Controller for handling admin-specific tasks (e.g. viewing all users)
const getAllUsers = async (req, res) => {
    try {
        // Fetch all users (can filter or add more admin-specific tasks here)
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'role'], // Fetch only required fields
        });
        res.status(200).json(users);  // Respond with the list of users
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllUsers,
};