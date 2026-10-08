import mongoose from "mongoose";
import {
  BusinessProfileDocumentStatus,
  BusinessProfileDocumentStatusEnum,
} from "../utils/enums.js";

const BusinessProfileDocumentSchema = new mongoose.Schema(
  {
    document_name: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    is_required: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: BusinessProfileDocumentStatusEnum,
      default: BusinessProfileDocumentStatus.Active,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {},
    toObject: { getters: true },
    toJSON: { getters: true },
  },
);

const BusinessProfileDocument = mongoose.model(
  "BusinessProfileDocument",
  BusinessProfileDocumentSchema,
);
export default BusinessProfileDocument;
