const jwt = require("jsonwebtoken");
const secretKey = process.env.ACCESSSECRETKEY;

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization token missing or malformed" });
        }
        const token = authHeader.split(" ")[1];
        const verifiedUser = jwt.verify(token, secretKey);
        req.user = verifiedUser; // Store user info for next middleware

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token !!" });
    }
};
