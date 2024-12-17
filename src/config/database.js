const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,  // Database name from .env
    process.env.DB_USER,  // Username from .env
    process.env.DB_PASSWORD,  // Password from .env
    {
        host: process.env.DB_HOST,  // Usually localhost
        dialect: 'mysql',  // MySQL dialect
    }
);

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to MySQL has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to MySQL:', error);
    });

module.exports = sequelize;
