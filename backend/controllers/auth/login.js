const bcrypt = require("bcryptjs");
const User = require("../../models/User.model");
const { loginValidation } = require("../../services/validation_schema");

const login = async (req, res, next) => {
  try {
    const loginResponse = await loginValidation.validateAsync(req.body);
    console.log(loginResponse);
    const { email, password } = loginResponse;

    const existingUser = await User.findOne({email})

    if (!existingUser) {
      return res.status(200).json({
        success: false,
        message: "Invalid Email Address. Please register.",
      });
    }
    const passwordMatching = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatching) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password. Please try again.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Login successfully 🎉",
      username: existingUser.username,
      email: existingUser.email,
      redirectTo: "/home",
    });

  } catch (error) {
    next(error);
  }
};

module.exports = login;