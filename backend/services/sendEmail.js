require("dotenv").config();  
const nodemailer = require("nodemailer");

const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,  
      pass: process.env.GMAIL_PASSWORD,  
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_ID,
    to: email,
    subject: "Password Reset OTP",
    html: `<p>Hello Sir/Mam,</p><br><h2>Your OTP for password reset is: <b>${otp}</b></h2><p>This OTP is valid for 10 minutes.</p><br><p><p>&copy; 2025 Online Tracking System (CTU). All rights reserved.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = sendOtpEmail;
