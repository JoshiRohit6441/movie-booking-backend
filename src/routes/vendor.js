import express from "express";
import {
  getProfile,
  resendVerificationCode,
  updateProfile,
  vendorLogin,
  verifyCode,
} from "../controller/vendor/VendorAuthController.js";
import {
  authCodeVerification,
  authTokenVerification,
} from "../middleware/authMiddleware.js";
import { profilePicUpload } from "../utils/file-upload.js";

const router = express.Router();

// login
router.post("/auth/login", vendorLogin);

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

export default router;
