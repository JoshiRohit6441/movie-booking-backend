import express from "express";
import {
  adminLogin,
  getProfile,
  resendVerificationCode,
  updateProfile,
  verifyCode,
} from "../controller/admin/AdminAuthController.js";
import {
  authCodeVerification,
  authTokenVerification,
} from "../middleware/authMiddleware.js";
import { profilePicUpload } from "../utils/file-upload.js";
import {
  createBusinessDocument,
  deleteRestoreBusinessDocument,
  getAllBusinessDocument,
  getSingleBusinessDocument,
  updateBusinessDocument,
  updateBusinessDocumentStatus,
} from "../controller/admin/AdminBusinessDocument.js";

const router = express.Router();

// ================================================ AUTHENTICATION ROUTES ================================================

// login
router.post("/auth/login", adminLogin);

// verify code
router.post("/auth/verify-code", authCodeVerification, verifyCode);

// get profile
router.get("/auth/profile", authTokenVerification, getProfile);

// update profile
router.put(
  "/auth/profile",
  authTokenVerification,
  profilePicUpload,
  updateProfile,
);

// resend verification code
router.post(
  "/auth/resend-verification-code",
  authCodeVerification,
  resendVerificationCode,
);

// ================================================BUSINESS DOCUMENT ROUTES ================================================
// create business document
router.post(
  "/business-document",
  authTokenVerification,
  createBusinessDocument,
);

// update business document
router.put("/business-document/:id", authTokenVerification, updateBusinessDocument);

// get all business document
router.get("/business-document", authTokenVerification, getAllBusinessDocument);

// get single business document
router.get(
  "/business-document/:id",
  authTokenVerification,
  getSingleBusinessDocument,
);

// update business document status
router.put(
  "/business-document/:id/status",
  authTokenVerification,
  updateBusinessDocumentStatus,
);

// delete/restore business document
router.delete(
  "/business-document/:id",
  authTokenVerification,
  deleteRestoreBusinessDocument,
);
export default router;
