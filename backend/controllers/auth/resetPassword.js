const ResetPasswordSchema = require("../../models/ResetPassword.model")
const User = require("../../models/User.model")
const bcrypt = require("bcryptjs");

const resetPassword = async (req, res, next) => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({ message: "Email and password are required" });
      }

      console.log("Email received:", email);

      const hashedPassword = await bcrypt.hash(password, 10);

      console.log("Hashed Password:", hashedPassword);

      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { password: hashedPassword },
        { new: true }
      );

      if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
      }

      await ResetPasswordSchema.findOneAndDelete({ email: email });
  
      res.json({ message: "Password reset successfully" });
  } catch (err) {
      next(err);
  }
};

module.exports = resetPassword