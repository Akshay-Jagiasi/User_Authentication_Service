const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const dotenv = require('dotenv');
const User = require('../src/models/user');  

dotenv.config();

const DEV_SERVER = process.env.DEVELOPMENT_SERVER;

describe('Profile API Tests', () => {
  let token; // Variable to store the JWT token
  let userId; // Variable to store the user ID

  // Register a user before running the tests
  before(async () => {
    const user = {
      username: 'profiletestuser1',
      email: 'profiletestuser1@example.com',
      password: 'profiletestuser1'
    };

    // Register the user
    const res = await request(DEV_SERVER)
      .post('/api/auth/register')
      .send(user);

    expect(res.status).to.equal(201); // Ensure user registration is successful


    // Login the user to get the JWT token
    const loginData = {
      email: user.email,
      password: user.password,
    };

    const loginRes = await request(DEV_SERVER)
      .post('/api/auth/login')
      .send(loginData);

    expect(loginRes.status).to.equal(200);  // Ensure login is successful
    token = loginRes.body.token; // Store the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    userId = decoded.userId;  // Store the user ID from the token
  });


  // Test to fetch user profile with valid JWT token
  it('should fetch user profile with valid JWT token', async () => {
    const res = await request(DEV_SERVER)
      .get('/api/profile') 
      .set('Authorization', `Bearer ${token}`);  // Set the Authorization header with the JWT token

    expect(res.status).to.equal(200);  // Ensure successful response
    expect(res.body).to.have.property('id', userId);  // Ensure the fetched profile matches the registered user
    expect(res.body).to.have.property('username', 'profiletestuser1');  // Ensure the profile contains the correct username
  });


  // Test with invalid JWT token
  it('should return 401 for invalid JWT token', async () => {
    const invalidToken = 'invalidtoken123'; // Use an invalid token for the test

    const res = await request(DEV_SERVER)
      .get('/api/profile')
      .set('Authorization', `Bearer ${invalidToken}`);

    expect(res.status).to.equal(401);  // Ensure Unauthorized status is returned
    expect(res.body).to.have.property('message', 'Invalid or expired token');
  });


  // Clean up the user after tests
  after(async () => {
    await User.destroy({ where: { id: userId } });
  });
});
