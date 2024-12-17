Features:
-User Registration: Create new user accounts.
-User Login: Authenticate users and generate JWT tokens.
-Profile Management: Retrieve user profile details.
-Admin Access: Role-based access for admin-specific features.
-Password Hashing: Secure user passwords using bcrypt.
-Role-Based Access Control: Ensure only authorized users can access specific endpoints.


_______________________________________________
Technologies Used:
-Backend: Node.js, Express.js
-Database: MySQL with Sequelize ORM
-Authentication: JWT (JSON Web Tokens)
-Testing: Mocha, Chai, Supertest
-Environment Management: dotenv


_______________________________________________
/auth-service
    /src
        /dbinit
            init.sql
        /config
            database.js           # Sequelize configuration for connecting to MySQL.
        /controllers
            authController.js     # Handles registration and login logic.
            profileController.js  # Handles fetching user profile details.
            adminController.js    # Handles admin-specific functionality.
        /middleware
            authMiddleware.js     # Middleware for JWT validation and role-based access control.
            isAdmin.js            # Middleware to check admin privileges.
        /models
            user.js               # Sequelize model for the "users" table.
        /routes
            authRoutes.js         # Routes for /register and /login.
            profileRoutes.js      # Route for /profile (protected).
            adminRoutes.js        # Route for /admin (admin-only access).
        index.js                  # Entry point for the application.
    /tests
        auth.test.js              # Unit and integration tests for authentication.
        profile.test.js           # Tests for user profile functionality.
        admin.test.js             # Tests for admin-specific features.
    .dockerignore
    .env                          # Environment variables for configuration (e.g., database credentials, JWT secret).
    docker-compose.yml
    Dockerfile
    package-lock.json
    package.json                  # Project metadata and dependencies.
    README.md                     # Documentation for the project.



_______________________________________________
Clone the repository:
git clone <repository-url>
cd auth-service


_______________________________________________
Install dependencies:
npm install


_______________________________________________
Configure environment variables:
Create a .env file in the root directory and add the following:
DB_HOST=localhost
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
JWT_SECRET_KEY=your_jwt_secret
PORT=5000
DEVELOPMENT_SERVER=http://localhost:5000


_______________________________________________
Set up the database:
-Run Sequelize migrations or ensure the database structure matches the models.

_______________________________________________
API Endpoints:
_______________________________________________
Authentication Endpoints
POST /api/auth/register
Registers a new user.
Request Body:
{
  "username": "string",
  "email": "string",
  "password": "string"
}
Response:
{
  "message": "User registered successfully."
}


_______________________________________________
POST /api/auth/login
Logs in a user and returns a JWT token.
Request Body:
{
  "email": "string",
  "password": "string"
}
Response:
{
  "message": "Login successful",
  "token": "string"
}


_______________________________________________
Profile Endpoint
GET /api/profile
Retrieves the profile of the authenticated user.
Requires Authorization Header: Bearer <token>
Response:
{
  "id": "number",
  "username": "string",
  "email": "string",
  "role": "string"
}


_______________________________________________
Admin Endpoint:
GET /api/admin
Accessible only by admin users
Returns a list of all users.
Requires Authorization Header: Bearer <token>


_______________________________________________
Testing:
Run the test suite using Mocha and Chai:
npm test
Test files include:
auth.test.js: Tests for user registration and login.
profile.test.js: Tests for fetching user profiles.
admin.test.js: Tests for admin-specific features.


_______________________________________________
Usage:
Start the server:
npm start


_______________________________________________
Access the API:
The base URL for the API is http://localhost:5000/api.
Test with tools like Postman or .