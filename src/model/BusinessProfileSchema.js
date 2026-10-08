import mongoose from "mongoose";
import {
  BusinessProfileStatus,
  BusinessProfileStatusEnum,
} from "../utils/enums.js";

const BusinessProfileSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    business_name: {
      type: String,
      required: true,
    },
    business_description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: BusinessProfileStatusEnum,
      default: BusinessProfileStatus.Inactive,
    },
    // documents: {
    //   type: Array,
    //   default: [],
    // },
  },
  {
    timestamps: {},
    toObject: { getters: true },
    toJSON: { getters: true },
  },
);
