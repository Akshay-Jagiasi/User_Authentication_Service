const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const dotenv = require('dotenv');
const User = require('../src/models/user');  

dotenv.config();

const DEV_SERVER = process.env.DEVELOPMENT_SERVER;

describe('Admin API Tests', () => {
  let adminToken;  // Variable to store the JWT token for admin
  let userToken;   // Variable to store the JWT token for a regular user
  let adminId;     // Variable to store the admin user ID
  let userId;      // Variable to store the regular user ID

  // Log in users (admin and regular user) before running the tests
  before(async () => {
    // Define admin and regular user credentials
    const adminCredentials = {
      email: 'admin@gmail.com',
      password: 'admin',
    };

    const userCredentials = {
      email: 'testuser2@gmail.com',
      password: 'testuser2',
    };

    // Log in the admin user
    const adminLoginRes = await request(DEV_SERVER)
      .post('/api/auth/login')
      .send(adminCredentials);

    expect(adminLoginRes.status).to.equal(200);  // Ensure admin login is successful
    adminToken = adminLoginRes.body.token; // Store the JWT token for the admin
    const decodedAdmin = jwt.verify(adminToken, process.env.JWT_SECRET_KEY);
    adminId = decodedAdmin.userId;  // Store the admin user ID

    // Log in the regular user
    const userLoginRes = await request(DEV_SERVER)
      .post('/api/auth/login')
      .send(userCredentials);

    expect(userLoginRes.status).to.equal(200);  // Ensure regular user login is successful
    userToken = userLoginRes.body.token; // Store the JWT token for the regular user
    const decodedUser = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    userId = decodedUser.userId;  // Store the regular user ID
  });


// Test for admin accessing /admin route
it('should allow admin to access /admin route', async () => {
    const res = await request(DEV_SERVER)
      .get('/api/admin')  // Admin route
      .set('Authorization', `Bearer ${adminToken}`);  // Set the Authorization header with the admin JWT token
    
    // Fetch users directly from the database to compare the response
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'role'], // Fetch only required fields
    });
  
    // Ensure successful response and compare the expected users
    expect(res.status).to.equal(200);  // Ensure successful response
    
    // Check if the response body contains the correct users
    expect(res.body).to.be.an('array');  //This line checks if the response body (res.body) is an array.
    expect(res.body.length).to.equal(users.length); //This line checks if the number of users returned by the API
    //                                                (res.body.length) matches the number of users in the database (users.length).
  });
  

  // Test for non-admin trying to access /admin route
  it('should return 403 for non-admin trying to access /admin route', async () => {
    const res = await request(DEV_SERVER)
      .get('/api/admin')  // Admin route
      .set('Authorization', `Bearer ${userToken}`);  // Set the Authorization header with the regular user JWT token

    expect(res.status).to.equal(403);  // Forbidden status
    expect(res.body).to.have.property('message', 'Access Denied: You do not have admin privileges');
  });

});