import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import connectDB from "./db/connection.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`DB CONNECTION FAILED: ${error.message}`);
  });
