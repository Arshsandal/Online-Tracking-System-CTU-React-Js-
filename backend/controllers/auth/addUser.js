const User = require("../../models/User.model");
const { addUservalidation } = require("../../services/validation_schema");
const sendEmailForAddUser = require("../../services/sendEmailForAddUser");
const bcrypt = require("bcryptjs");

const addUser = async (req, res, next) => {
  try {
    const validatedData = await addUservalidation.validateAsync(req.body);
    const { username, dob, email, password, remember, role } = validatedData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already registered");
      return res.status(400).json({
        message: "User already registered. Please login.",
        isNewUser: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      dob,
      email,
      password: hashedPassword,
      remember,
      role,
    });

    await newUser.save();

    try {
      await sendEmailForAddUser(email, password); // optionally send username here too
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr.message);
      // You can still return 201, or include a warning
    }

    console.log("User Registered Successfully");
    return res.status(201).json({
      message: "User registered successfully 🎉",
      success: true,
      isNewUser: true,
    });

  } catch (error) {
    console.error("Registration Error:", error.message);
    return res.status(500).json({
      message: "Failed to register user",
      error: error.message,
    });
  }
};

module.exports = addUser;
