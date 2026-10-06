import express from "express";
import {
  adminLogin,
  getProfile,
  updateProfile,
  verifyCode,
} from "../controller/admin/AdminAuthController.js";
import {
  authCodeVerification,
  authTokenVerification,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// login
router.post("/auth/login", adminLogin);

// verify code
router.post("/auth/verify-code", authCodeVerification, verifyCode);

// get profile
router.get("/auth/profile", authTokenVerification, getProfile);

// update profile
router.put("/auth/profile", authTokenVerification, updateProfile);
export default router;
