const { expect } = require('chai');
const request = require('supertest');
const dotenv = require('dotenv');
const User = require('../src/models/user');  
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

dotenv.config();

const DEV_SERVER = process.env.DEVELOPMENT_SERVER;

describe('Authentication API Tests', () => {
  let token;
  let userId;
  let userEmail = 'mochatestinguser@example.com'; 
  let username = 'mochatestinguser'
  let password = 'mochatestingpassword'

  // Test for password hashing
  it('should hash the password before saving a user', async () => {
    const password = 'password123';

    const hashedPassword = await bcrypt.hash(password, 10);
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    expect(isPasswordValid).to.be.true; 
  });


  // Test for JWT generation and verification
  it('should generate and verify a JWT token', async () => {
    const payload = { username: 'testuser', email: 'testuser@gmail.com', role: 'user' };
    const secret = 'test_secret';
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    // Verify the token
    const decoded = jwt.verify(token, secret);

    // Validate the token's payload
    expect(decoded).to.have.property('username', 'testuser');
    expect(decoded).to.have.property('email', 'testuser@gmail.com');
    expect(decoded).to.have.property('role', 'user');
    expect(decoded).to.have.property('iat'); // Ensure 'issued at' timestamp exists
  });


  // Test for successful user registration
  it('should register a new user successfully', async () => {
    const user = {
      username: username,
      email: userEmail,
      password: password,
    };

    // Register the user
    const res = await request(DEV_SERVER)
      .post('/api/auth/register')
      .send(user);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message', 'User registered successfully.');

    // Extract userId from the response
    const newUser = await User.findOne({ where: { email: userEmail } });
    userId = newUser.id;
  });


  // Test for trying to register the same user again (user already exists)
  it('should return an error when the user already exists', async () => {
    const user = {
      username: username,
      email: userEmail,
      password: password,
    };

    // Try to register the same user again (user already exists)
    const duplicateResponse = await request(DEV_SERVER)
      .post('/api/auth/register')
      .send(user);
    expect(duplicateResponse.status).to.equal(400);  // Conflict (user already exists)
    expect(duplicateResponse.body).to.have.property('error', 'User already exists with this email.');
  });


  //Test for /login API
  it('should login a registered user and return a JWT token', async () => {
    const loginData = {
      email: userEmail,
      password: password,
    };

    const response = await request(DEV_SERVER)
      .post('/api/auth/login')
      .send(loginData);
    expect(response.status).to.equal(200);
    const { token } = response.body;
    expect(token).to.not.be.null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    expect(decoded).to.have.property('userId');
    expect(decoded).to.have.property('role', 'user');
  });


  // Non Existing User Test for login
  it('should return 404 for non-existing user during login', async () => {
    const loginData = {
      email: 'wronguser@example.com',  // Non-existing user
      password: 'wrongpassword',
    };

    const res = await request(DEV_SERVER)
      .post('/api/auth/login')
      .send(loginData);

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('message', 'User not found');
  });


  // Clean up the user after tests (deleting the created user by userId)
  after(async () => {
    await User.destroy({ where: { id: userId } });
  });
});
