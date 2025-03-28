const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const crypto = require("crypto");

const accessSecret = process.env.ACCESS_SECRET || "your_access_secret";
const refreshSecret = process.env.REFRESH_SECRET || "your_refresh_secret";

const generateAccessToken = (payload) => {
  if (!payload) return createError.BadRequest("Payload is required");
  const token = jwt.sign(payload, accessSecret);
  return token;
};

const generateRefreshToken = (payload) => {  // Removed extra comma
  if (!payload) return createError.BadRequest("Payload is required");
  const token = jwt.sign(payload, refreshSecret);
  return token;
};

const generateCryptoKey = () => crypto.randomBytes(32).toString("hex");

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateCryptoKey,
};
