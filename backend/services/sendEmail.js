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
    from: `CTU Admin Team - ${process.env.GMAIL_ID}`,
    to: email,
    subject: "Reset Your Password - OTP Verification",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          <h2 style="color: #333;">🔒 Password Reset Request</h2>
          <p>Hi,</p>
          <p>We received a request to reset your password. Please use the OTP below to complete the process:</p>
          
          <div style="margin: 30px 0; text-align: center;">
            <span style="display: inline-block; font-size: 32px; font-weight: bold; color: #007bff;">${otp}</span>
          </div>
          
          <p>This OTP is valid for <strong>10 minutes</strong>. If you did not request a password reset, please ignore this email or contact support.</p>
  
          <p>Thank you,<br>The Online Tracking System (CTU) Team</p>
  
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
          <p style="text-align: center; font-size: 12px; color: #888;">
            &copy; 2025 Online Tracking System (CTU). All rights reserved.
          </p>
        </div>
      </div>
    `,
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
