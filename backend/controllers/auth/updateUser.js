const User = require("../../models/User.model");

const updateUser = async (req, res) => {
  try {
    const { username, dob, role } = req.body;
    const { id } = req.params;

    // Validate required fields
    if (!username || !dob || !role) {
      return res.status(400).json({ message: "Username, DOB, and role are required" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields
    user.username = username;
    user.dob = dob;
    user.role = role;

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        dob: user.dob,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateUser;
