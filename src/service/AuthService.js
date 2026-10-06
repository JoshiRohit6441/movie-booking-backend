import handleResponse from "../utils/handle-rsponse.js";
import User from "../model/UserSchema.js";
import {
  comparePassword,
  generateAuthToken,
  generateOTP,
  pathNormalizer,
} from "../utils/helper-function.js";
import redis from "../../config/redisConfig.js";

// admin login service
export const adminLoginService = async (email, password, resp) => {
  try {
    const user = await User.findOne({ email });
    if (!["admin", "staff"].includes(user.role))
      return handleResponse(401, "Unauthorized", {}, resp);

    if (!user) return handleResponse(401, "Unauthorized", {}, resp);

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect)
      return handleResponse(401, "Unauthorized", {}, resp);

    const accessToken = generateAuthToken(user._id?.toString(), "access");

    resp.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
      sameSite: "lax",
    });

    const code = generateOTP();

    await redis.set(
      `verification:${user._id?.toString()}`,
      code,
      "EX",
      15 * 60,
    );

    return handleResponse(
      200,
      "Verification Code send to registered email",
      {},
      resp,
    );
  } catch (err) {
    return handleResponse(500, "Internal Server Error", err?.message, resp);
  }
};

// admin verification code service
export const adminVerificationCodeService = async (code, type, req, resp) => {
  try {
    const userId = req.user?._id?.toString();

    const getCode = await redis.get(`verification:${userId}`);

    if (!getCode)
      return handleResponse(400, "Invalid or Expired Code", {}, resp);

    if (getCode !== code) return handleResponse(400, "Invalid Code", {}, resp);

    await redis.del(`verification:${userId}`);
    const user = await User.findById(userId);

    if (user.status === "inactive") {
      user.status = "active";
      await user.save();
    }

    redis.del(`verification:${userId}`);

    if (type == "login") {
      const refresh_token = generateAuthToken(userId, "access");

      resp.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "lax",
      });
      return handleResponse(200, "Login Successful", {}, resp);
    } else {
      return handleResponse(200, "Verification Successful", {}, resp);
    }
  } catch (err) {
    return handleResponse(500, err?.message, {}, resp);
  }
};

// get profile
export const getProfileService = async (req, resp) => {
  try {
    const userId = req.user?._id?.toString();
    const user = await User.findById(userId);
    if (!user) return handleResponse(404, "User not found", {}, resp);
    return handleResponse(200, "Profile fetched successfully", user, resp);
  } catch (err) {
    return handleResponse(500, err?.message, {}, resp);
  }
};

// update profile service
export const updateProfileService = async (req, resp) => {
  try {
    const { name, profile_image } = req.body;
    const file = req.files;

    const profilePic =
      Array.isArray(file?.profile_image) && file?.profile_image[0]
        ? file?.profile_image[0]?.path
        : profile_image
          ? pathNormalizer(profile_image)
          : null;

    const userId = req.user?._id?.toString();
    const user = await User.findById(userId);
    if (!user) return handleResponse(404, "User not found", {}, resp);
    user.name = name;
    user.profile_image = profilePic;
    await user.save();
    return handleResponse(200, "Profile updated successfully", user, resp);
  } catch (err) {
    return handleResponse(500, err?.message, {}, resp);
  }
};
