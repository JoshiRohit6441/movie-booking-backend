import User from "../model/UserSchema.js";
import handleResponse from "../utils/handle-rsponse.js";
import { generateAuthToken, verifyToken } from "../utils/helper-function.js";

// general purpose token verification middleware
export const authTokenVerification = async (req, resp, next) => {
  try {
    const access_token = req?.cookies?.["access_token"];

    if (!access_token) {
      return handleResponse(401, "Unauthorized", {}, resp);
    }

    const decoded = verifyToken(access_token, "access");


    let user = null;

    if (decoded) {
      user = await User.findById(decoded.id);

      if (!user) {
        return handleResponse(401, "Unauthorized", {}, resp);
      }

      if (user.status === "suspended") {
        return handleResponse(401, "Unauthorized", {}, resp);
      }

      req.user = user;

      return next();
    }

    const refresh_token = req?.cookies?.["refresh_token"];

    if (!refresh_token) {
      return handleResponse(401, "Unauthorized", {}, resp);
    }

    const refreshDecoded = verifyToken(refresh_token, "refresh");

    if (!refreshDecoded) {
      return handleResponse(401, "Unauthorized", {}, resp);
    }

    user = await User.findById(refreshDecoded.id);

    if (!user) {
      return handleResponse(401, "Unauthorized", {}, resp);
    }

    if (user.status === "suspended") {
      return handleResponse(401, "Unauthorized", {}, resp);
    }

    const generated_access_token = generateAuthToken(
      refreshDecoded.id,
      "access",
    );

    resp.cookie("access_token", generated_access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
      sameSite: "lax",
    });

    req.user = user;

    return next();
  } catch (err) {
    return handleResponse(500, err?.message, {}, resp);
  }
};

// code verification middleware
export const authCodeVerification = async (req, resp, next) => {
  try {
    const token = req.cookies["access_token"];

    if (!token) return handleResponse(401, "Unauthorized", {}, resp);

    const decoded = verifyToken(token, "access");

    if (!decoded) return handleResponse(401, "Session Expired", {}, resp);
    const user = await User.findById(decoded?.id);
    if (!user) return handleResponse(401, "Unauthorized", {}, resp);
    if (user.status === "suspended")
      return handleResponse(401, "Unauthorized", {}, resp);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return handleResponse(500, err?.message, {}, resp);
  }
};
