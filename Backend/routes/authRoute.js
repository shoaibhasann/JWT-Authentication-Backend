const express = require('express');


// import functions from controllers
const {signUp,signIn,getUser,logOut} = require('../controllers/authController.js');
const authRouter = express.Router();
const authenticateToken = require('../middleware/jwtAuth.js');

// different routes

authRouter.post('/signup', signUp);
authRouter.post('/login', signIn);
authRouter.get('/user', authenticateToken, getUser);
authRouter.get('/logout', authenticateToken, logOut);


module.exports = authRouter;
