const User = require("../../models/User.model");
const { loginValidation } = require("../../services/validation_schema");

const login = async (req, res, next) => {
  try {
    const loginResponse = await loginValidation.validateAsync(req.body);
    console.log(loginResponse);
    const { email, password } = loginResponse;

    const existingUser = await User.findOne({email})
    const existingPassword = await User.findOne({ password })

    console.log("existingEmail", existingUser.email);
    console.log("existingPassword", existingPassword.password);
    console.log("existingUser", existingUser.username);


    if (!existingUser) {
      return res.status(200).json({
        success: false,
        message: "Invalid Email Address. Please register.",
        isNewUser: false,
      });
    }

    const passwordMatching = password === existingPassword.password;
    if (!passwordMatching) {
      throw new Error(`${password} is Incorrect Password. Please try again.`);
    }

    return res.status(201).json({
      success: true,
      message: "Login successfully 🎉",
      isNewUser: true,
      username: existingUser.username,
      email: existingUser.email,
      redirectTo: "/home",
    });

  } catch (error) {
    next(error);
  }
};

module.exports = login;