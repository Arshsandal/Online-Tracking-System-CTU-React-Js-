const ResetPasswordSchema = require("../../models/ResetPassword.model");

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ success: false, message: "Email and OTP are required" });

    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) return res.status(400).json({ success: false, message: "Invalid or expired OTP" });

    await ResetPasswordSchema.deleteOne({ email }); // Delete OTP after successful verification
    return res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "OTP verification failed" });
  }
};

module.exports = verifyOtp;
