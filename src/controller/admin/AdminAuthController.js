import handleResponse from "../../utils/handle-rsponse.js";
import User from "../../model/UserSchema.js";
import {
  adminLoginService,
  adminVerificationCodeService,
  getProfileService,
  updateProfileService,
} from "../../service/AuthService.js";

// login controller
export const adminLogin = async (req, resp) => {
  const { email, password } = req.body;

  const response = await adminLoginService(email, password, resp);
  return response;
};

// verify code controller
export const verifyCode = async (req, resp) => {
  const { code, type } = req.body;

  if (!["login", "password-reset"].includes(type))
    return handleResponse(400, "Invalid Type", {}, resp);

  const response = await adminVerificationCodeService(code, type, req, resp);
  return response;
};

// get profile constroller
export const getProfile = async (req, resp) => {
  const response = await getProfileService(req, resp);
  return response;
};

// update profile controller
export const updateProfile = async (req, resp) => {
  const response = await updateProfileService(req, resp);
  return response;
};
