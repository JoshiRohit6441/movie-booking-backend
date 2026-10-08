import express from "express";
import ENV from "./config/envConfig.js";
import cors from "cors";
import dbConnection from "./config/dbConfig.js";
import adminRoutes from "./src/routes/admin.js";
import vendorRoutes from "./src/routes/vendor.js";
import handleResponse from "./src/utils/handle-rsponse.js";
import { connectRedis } from "./config/redisConfig.js";
import { fileURLToPath } from "url";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser())
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "")));

dbConnection();
connectRedis();

app.use("/api/admin", adminRoutes);
app.use("/api/vendor", vendorRoutes);

app.get("/", (req, res) => {
  return handleResponse(200, "Working Perfectly", {}, res);
});

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
