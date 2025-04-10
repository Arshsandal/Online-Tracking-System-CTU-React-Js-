const User = require("../../models/User.model");
const Otp = require("../../models/Otp.model")
const sendEmail = require("../../services/sendEmail")
const { forgotValidation } = require("../../services/validation_schema")

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
}

const forgotPassword = async (req, res, next) => {
  const forgotPasswordResponse = await forgotValidation.validateAsync(req.body);
  console.log(forgotPasswordResponse);

  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const otp = generateOTP();
    await Otp.create({ email, otp });

    await sendEmail(email, otp);

    return res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
}

module.exports = forgotPassword;