import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL || process.env.MONGODB_URI;
    if (!mongoUrl) {
      throw new Error(
        "MONGODB_URL or MONGODB_URI is not defined in environment variables"
      );
    }

    const connectionInstance = await mongoose.connect(mongoUrl.trim(), {
      dbName: DB_NAME,
    });

    console.log(
      `MONGO DB CONNECTED SUCCESSFULLY !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("MONGO DB CONNECTION ERROR: ", err);
    process.exit(1);
  }
};

export default connectDB;
