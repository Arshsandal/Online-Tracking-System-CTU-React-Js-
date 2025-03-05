const { message } = require("antd");

const register = async (req, res, next) => {
  try {
    const registerResponse = req.body
    console.log(registerResponse);
    res.status(200).json({
      message:"good",
    success:true
    })
  } catch (error) {
    next(error);
  }
};

module.exports = register;