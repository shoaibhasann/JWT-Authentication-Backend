const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [5, "Name must be at least 5 characters"],
      maxLength: [50, "Name must be less than 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      unique: [true, "Email is already registered"],
      lowercase: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose pre middleware to hash user password before creation
  userSchema.pre('save', async function (next) {
    try {
      // Check if the password field has been modified
      if (!this.isModified('password')) {
        return next();
      }

      // Hash the user password using bcrypt with a cost factor of 10
      this.password = await bcrypt.hash(this.password, 10);

      // Proceed to the next middleware or save operation
      return next();
    } catch (error) {
      // Handle any errors that occur during password hashing
      return next(error);
    }
  });


userSchema.methods = {
      jwtToken(){
          return JWT.sign(
            {id: this._id, email: this.email},
            process.env.SECRET,
            {expiresIn: '24h'}
          )
      }
};


// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
