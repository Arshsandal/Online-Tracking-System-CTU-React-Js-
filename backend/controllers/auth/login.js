const bcrypt = require("bcryptjs");
const User = require("../../models/User.model");
const { loginValidation } = require("../../services/validation_schema");
const { generateAccessToken } = require("../../services/generateToken");

const login = async (req, res, next) => {
  try {
    const loginResponse = await loginValidation.validateAsync(req.body);
    console.log("Login Request Data:", loginResponse);
    
    const { email, password } = loginResponse;
    const existingUser = await User.findOne({ email });
// console.log(existingUser,"existingUser") 
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

    const accessSecret = process.env.ACCESSSECRETKEY;

    const payload = {
      username: existingUser.username,
      email: existingUser.email,
      userId : existingUser._id,
       role: existingUser.role,
    };

    const accessToken = generateAccessToken(payload, accessSecret);
    
    console.log("Generated Access Token:", accessToken);

    return res.status(201).json({
      success: true,
      message: "Login successfully 🎉",
      redirectTo: "/home",
      payload,
      token:accessToken,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = login;
