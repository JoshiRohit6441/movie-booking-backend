import mongoose from "mongoose";
import {
  UserRoleEnum,
  UserRoles,
  UserStatus,
  UserStatusEnum,
} from "../utils/enums.js";
import ENV from "../../config/envConfig.js";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enums: UserRoleEnum,
      default: UserRoles.Customer,
    },
    status: {
      type: String,
      enums: UserStatusEnum,
      default: UserStatus.Active,
    },
    profile_image: {
      type: String,
      default: null,
      get: (val) => {
        if (!val) return null;
        if (val.startsWith("http")) return val;
        return `${ENV.APP_URL}/${val}`;
      },
    },
  },
  {
    timestamps: {},
    toObject: { getters: true },
    toJSON: { getters: true },
  },
);

const User = mongoose.model("User", UserSchema);
export default User;
