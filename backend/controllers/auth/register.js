const User = require("../../models/User.model");
const { registrationValidation } = require("../../services/validation_schema");
const bcrypt = require("bcryptjs")


const register = async (req, res, next) => {
  try {
    const registerResponse = await registrationValidation.validateAsync(req.body);
    const {username, dob, email, password, confirmPassword, remember} = registerResponse;
    console.log(registerResponse);

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      console.log("User already registered"); 
      return res.status(400).json({
        message: "User already registered. Please login.",
        isNewUser: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
     
    console.log(hashedPassword);
    

    const newUser = new User({
      username,
      dob,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      remember
    });

    await newUser.save();

    console.log("User Register Successfully"); 
    return res.status(201).json({
      message: "User registered successfully 🎉",
      success:true,
      isNewUser: true,
    });
    
    
  } catch (error) {
    next(error);
  }
};

module.exports = register;