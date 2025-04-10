require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmailForAddUser = async (email, password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"CTU Admin Team" <${process.env.GMAIL_ID}>`, // More professional from field
    to: email,
    subject: "User Account Successfully Created",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h2 style="color: #4CAF50;">Welcome to the System!</h2>
        <p>Dear User,</p>
        <p>We are pleased to inform you that your account has been successfully created by the administrator.</p>
        <p>You can now log in using your registered email ID and password ${password}.</p>
        <p>If you have any questions or need further assistance, feel free to contact support.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>CTU Admin Team</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Add User email sent successfully");
  } catch (error) {
    console.error("Error sending Add User email:", error); // Corrected log
    throw new Error("Failed to send Add User email");
  }
};

module.exports = sendEmailForAddUser;
