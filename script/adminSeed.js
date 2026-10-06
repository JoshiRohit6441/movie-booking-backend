import mongoose from "mongoose";
import ENV from "../config/envConfig.js";
import { hashPassword } from "../src/utils/helper-function.js";
import { UserRoles, UserStatus } from "../src/utils/enums.js";
import User from "../src/model/UserSchema.js";


await mongoose.connect(ENV.DB_URL);

const password = await hashPassword("Test@1234");

const payload = {
  name: "Admin Shabh",
  email: "admin@yopmail.com",
  password: password,
  role: UserRoles.Admin,
  status: UserStatus.Active,
};

const adminDetails = await User.findOne({
  email: "admin@yopmail.com",
  role: UserRoles.Admin,
});

if (adminDetails) {
  console.log("Admin already exists");
  process.exit(1);
} else {
  const admin = await User.create(payload);
  console.log("Admin created successfully");
  process.exit(0);
}
