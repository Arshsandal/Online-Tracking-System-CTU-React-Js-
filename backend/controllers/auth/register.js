const User = require("../../models/User.model");
const { registrationValidation } = require("../../services/validation_schema");


const register = async (req, res, next) => {
  try {
    const registerResponse = await registrationValidation.validateAsync(req.body);
    const {username, dob, email, password, confirmPassword, remember} = registerResponse;
    console.log(registerResponse);

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser ) {
      throw new Error(`${email} is already exist. Please login.`);
    }

    const user = new User({
      username,
      dob,
      email,
      password,
      confirmPassword,
      remember
    });

    await user.save();

    res.status(200).json({
      message: "good",
      success: true
    })
  } catch (error) {
    next(error);
  }
};

module.exports = register;