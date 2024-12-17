const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Import the sequelize instance
const bcrypt = require('bcryptjs');  // Import bcrypt for password hashing


const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Make username unique
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Make email unique
    validate: {
      isEmail: true,  // Ensure email format
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',  // Default role is 'user'
    allowNull: false,
    validate: {
      isIn: [['user', 'admin']],  // Allow only 'user' and 'admin' roles
    },
  },
}, {
  timestamps: true,  // Enable Sequelize's automatic handling of createdAt and updatedAt
  // Hooks for password hashing
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);  // Hash password before saving
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {  // If password is updated, hash it
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
  },
});

module.exports = User;