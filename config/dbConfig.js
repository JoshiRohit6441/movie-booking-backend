import mongoose from "mongoose";
import ENV from "./envConfig.js";

async function dbConnection() {
  try {
    await mongoose.connect(ENV.DB_URL);
    console.log("[INFO] Connected to the database");
  } catch (err) {
    console.log("[ERROR] Failed to connect to the database");
  }
}

export default dbConnection;