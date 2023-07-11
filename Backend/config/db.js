const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful:", connection.connection.host);
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }
};

module.exports = connectDatabase;
