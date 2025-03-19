require("dotenv").config();  
const nodemailer = require("nodemailer");

const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,  // Your Gmail
      pass: process.env.GMAIL_PASSWORD,  // App Password (not your actual password)
    },
  });

  console.log("Email:", process.env.GMAIL_ID);
console.log("Password:", process.env.GMAIL_PASSWORD ? "Loaded" : "Not Loaded");

  const mailOptions = {
    from: process.env.GMAIL_ID,
    to: email,
    subject: "Password Reset OTP",
    html: `<p>Your OTP for password reset is: <b>${otp}</b></p><p>This OTP is valid for 10 minutes.</p>`,
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
