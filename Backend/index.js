require("dotenv").config(); // Load environment variables from .env file
const app = require("./app.js");


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
