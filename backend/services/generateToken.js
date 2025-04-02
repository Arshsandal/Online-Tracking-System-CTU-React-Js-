const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const accessSecret = process.env.ACCESSSECRETKEY || "your_access_secret";
const refreshSecret = process.env.REFRESHSECRETKEY || "your_refresh_secret";

const generateAccessToken = (payload) => {
  if (!payload) {
    console.log("Error: Payload is required");
    return null;
  }
  return jwt.sign(payload, accessSecret);
};

const generateRefreshToken = (payload) => {
  if (!payload) {
    console.log("Error: Payload is required");
    return null;
  }
  return jwt.sign(payload, refreshSecret);
};

const generateCryptoKey = () => crypto.randomBytes(32).toString("hex");

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateCryptoKey,
};
