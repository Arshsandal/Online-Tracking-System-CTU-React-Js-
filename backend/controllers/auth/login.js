const User = require("../../models/User.model");
const { loginValidation } = require("../../services/validation_schema");

const login = async (req, res, next) => {
  try {
    const loginResponse = await loginValidation.validateAsync(req.body);
    console.log(loginResponse);
    const { email, password, remember } = loginResponse;

    const existingEmail = await User.findOne({ email })
    const existingPassword = await User.findOne({ password })

    console.log("existingPassword", existingPassword.password);
    console.log("existingEmail", existingEmail.email);


    if (!existingEmail) {
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
    });

  } catch (error) {
    next(error);
  }
};

module.exports = login;