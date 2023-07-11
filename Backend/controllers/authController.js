const userModel = require("../models/userSchema.js");
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

// signUp route logic for register or sign up
exports.signUp = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // check all fields are provided
    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
            success: false,
            message: 'all fields are required'
        });
    }

    // check email is valid or not
    const validEmail = emailValidator.validate(email);

    if(!validEmail){
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email'
        });
    }

    // Check if the passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }
    

    // Create new user to the database
    const savedUser = await userModel.create({
            name,
            email,
            password,
    });

    // remove hashed password from the response
    savedUser.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Signup successful.",
      data: savedUser,
    });
  } catch (error) {
    // check user already exists with provided email id
    if(error.code === 11000){
        return res.status(400).json({
            success: false,
            message: 'Account already exists with provided email'
        });
    }
    return res.status(500).json({
      success: false,
      message: "An error occurred during signup.",
      error: error.message,
    });
  }
};

// signIn route logic for sign in or login 
exports.signIn = async (req, res) => {
  try {
    // Extract information from the request body
    const { email, password } = req.body;

    // Check if the email is valid
    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find the user in the database
    const user = await userModel.findOne({ email }).select("+password");

    // Check if the user exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generate a JWT token
    const token = user.jwtToken();

    // Hide the password in the response
    user.password = undefined;

    // Set cookie options
    const cookieOptions = {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
    };

    // Set the token as a cookie in the response
    res.cookie("token", token, cookieOptions);

    // Send the response to the user after successful authentication
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getUser route logic for getting user information
exports.getUser = async (req,res) => {
       try {
           // extract user id
           const userId = req.user.id;

           // find user
           const user = await userModel.findById(userId);
           
           // if user not logged in
           if(!user){
              return res.status(400).json({
                  success: false,
                  message: 'User not logged in'
              });
           }
          
           // send response
           res.status(200).json({
                 success: true,
                 data: user
           });
       } catch (error) {
           res.status(500).json({
               success: false,
               message: error.message
           });
       }
}

// logout user route
exports.logOut = async (req, res) => {
  try {
    // Set cookie options to expire the token immediately
    const cookieOptions = {
      expires: new Date(0), // Set the expiration date to a past date
      httpOnly: true,
    };

    // Clear the token by setting it to null
    res.cookie('token', null, cookieOptions);

    // Send a success response indicating successful logout
    res.status(200).json({
      success: true,
      message: 'Logged out',
    });
  } catch (error) {
    // Handle any errors that occur during the logout process
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

