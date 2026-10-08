import {
  adminVerificationCodeService,
  getProfileService,
  loginWithOTPService,
  registerAsVendorService,
  resendVerificationCodeService,
  updateProfileService,
} from "../../service/AuthService.js";

// register vendor controller
// export const vendorRegister = async (req, resp) => {
//   const response = await registerAsVendorService(req, resp);
//   return response;
// };

// login vendor controller
export const vendorLogin = async (req, resp) => {
  const response = await loginWithOTPService(req, resp);
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

// resend verification code controller
export const resendVerificationCode = async (req, resp) => {
  const response = await resendVerificationCodeService(req, resp);
  return response;
};

// get profile controller
export const getProfile = async (req, resp) => {
  const response = await getProfileService(req, resp);
  return response;
};

// update profile controller
export const updateProfile = async (req, resp) => {
  const response = await updateProfileService(req, resp);
  return response;
};
