const express = require("express");
const app = express();
const connectDatabase = require("./config/db.js");
const authRouter = require("./routes/authRoute.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Connect to the database
connectDatabase();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRouter);

// Default route
app.use("/", (req, res) => {
  res.status(200).json({
    data: "JWTauth Server updated",
  });
});

module.exports = app;
