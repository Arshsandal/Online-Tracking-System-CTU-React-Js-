const jwt = require("jsonwebtoken");

const secretKey = process.env.ACCESSSECRETKEY;

module.exports = (req, res, next) => {
  try {
    // Check if Authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Authorization header missing!",
      });
    }

    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Attach user data to request for further use
    req.user = decoded;

    // Continue to the next middleware or route
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);

    // Handle different JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired. Please log in again.",
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid Token !!",
      });
    } else {
      return res.status(500).json({
        message: "Authentication failed!",
      });
    }
  }
};