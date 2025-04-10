const User = require("../../models/User.model");
const ResetPasswordSchema = require("../../models/ResetPassword.model");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

// ✅ Match frontend fields
const resetPasswordValidation = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().min(6).required(),
  confirmNewPassword: Joi.any().valid(Joi.ref("newPassword")).required().messages({
    "any.only": "Passwords do not match!",
  }),
});

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = await resetPasswordValidation.validateAsync(req.body);

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.confirmPassword = hashedPassword;

    await user.save();

    await ResetPasswordSchema.findOneAndDelete({ email: email.toLowerCase() });

    return res.status(200).json({ message: "Password reset successfully 🎉", success: true });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = resetPassword;
