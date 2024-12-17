const isAdmin = (req, res, next) => {
    // Check if the user's role is 'admin'
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied: You do not have admin privileges'});
    }
    next(); // Proceed to the route if the user is admin
};

module.exports = isAdmin;
