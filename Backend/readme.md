# JWT Authentication Backend

This is a backend server implementation for JWT authentication. It provides API endpoints for user signup, login, getting user information, and logout. The server is built using Express.js, Node.js, MongoDB, and several other npm packages.

## Features

- User signup: Allows users to create a new account by providing their name, email, password, and confirming the password.
- User login: Authenticates users by validating their email and password and generates a JSON Web Token (JWT) for subsequent authenticated requests.
- Get user information: Retrieves user details and returns them in the response. Requires authentication using a valid JWT.
- Logout: Clears the authentication token (JWT) stored as a cookie, effectively logging out the user.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shoaibhasann/JWT-Authentication-Backend.git


2. Navigate to the project directory:

cd Backend
Install the dependencies:   

3. Start the server

   ```node
   npm run start



Dependencies
The project utilizes the following npm packages:

- Express: Fast, unopinionated web framework for Node.js.
- MongoDB & Mongoose: MongoDB ODM (Object Data Modeling) library.
- Cors: Middleware to enable Cross-Origin Resource Sharing (CORS) support.
- Bcrypt: Library for hashing passwords.
- Jsonwebtoken: Library for generating and validating JSON Web Tokens (JWTs).
- Cookie-parser: Middleware for handling cookies in Express.
- Email-validator: Library for validating email addresses.

API Endpoints :-

POST /api/auth/signup: User signup endpoint.
POST /api/auth/login: User login endpoint.
GET /api/auth/user: Get user information endpoint.
GET /api/auth/logout: Logout endpoint.


Contribution
Contributions are welcome! If you find any issues or want to enhance the functionality, feel free to open a pull request or create an issue on the repository.

