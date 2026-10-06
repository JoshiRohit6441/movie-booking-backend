import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ENV from "../../config/envConfig.js";

// generate OTP
export function generateOTP() {
  return ENV.NODE_ENV == "production"
    ? Math.floor(1000 + Math.random() * 9000)
    : 9999;
}

// generate password
export function generatePassword() {
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()";
  const allChars = lowerCase + upperCase + numbers + symbols;
  return ENV.NODE_ENV == "production"
    ? Array.from(
        { length: 10 },
        () => allChars[Math.floor(Math.random() * allChars.length)],
      ).join("")
    : "Test@1234";
}

// generate jwt token
export function generateAuthToken(id, type) {
  if (!["access", "refresh"].includes(type))
    throw new Error("Invalid token type");

  if (type == "access")
    return jwt.sign({ id }, ENV.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

  if (type == "refresh")
    return jwt.sign({ id }, ENV.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
}

// verify token
export const verifyToken = (token, type) => {
  try {
    return jwt.verify(
      token,
      type == "access" ? ENV.ACCESS_TOKEN_SECRET : ENV.REFRESH_TOKEN_SECRET,
    );
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return null;
    }

    return null;
  }
};

// hash password
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// compare password
export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// image path normalizer
export const pathNormalizer = (path) => {
  const url = new URL(path);
  return url.pathname;
};
