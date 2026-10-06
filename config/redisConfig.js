import Redis from "ioredis";
import ENV from "./envConfig.js";

const redis = new Redis(ENV.REDIS_URL);

export async function connectRedis() {
  redis.on("connect", () => {
    console.log("[INFO] Connected to Redis");
  });

  redis.on("error", (err) => {
    console.error("[ERROR] Redis connection error:", err);
  });
}

export default redis;
