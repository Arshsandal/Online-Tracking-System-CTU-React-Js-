const Otp = require("../../models/Otp.model"); 

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const otpRecord = await Otp.findOne({ otp });
    
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    console.log("Stored OTP:", otpRecord.otp);
    console.log("Entered OTP:", otp); 

    if (typeof otpRecord.otp === "number") {
      otpRecord.otp = otpRecord.otp.toString();
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    await Otp.deleteOne({ email });

    return res.json({ success: true, message: "OTP verified successfully" });

  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({ success: false, message: "OTP verification failed", error: error.message });
  }
};

module.exports = verifyOtp;
