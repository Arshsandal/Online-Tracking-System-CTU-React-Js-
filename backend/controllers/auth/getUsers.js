const User = require("../../models/User.model");

const getUser = async (req, res) => {
  try {
    const users = await User.find();  
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = getUser