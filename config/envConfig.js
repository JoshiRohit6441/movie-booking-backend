import dotenv from "dotenv";

dotenv.config({ quiet: true });

const ENV = {
  // PORT
  PORT: process.env.PORT,

  // NODE_ENV
  NODE_ENV: process.env.NODE_ENV,

  // MONGO_URI
  DB_URL: process.env.MONGO_URI,

  // JWT_SECRET
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,

  // REDIS_URL
  REDIS_URL: process.env.REDIS_URL,

  // APP_URL
  APP_URL: process.env.APP_URL,
};

export default ENV;
