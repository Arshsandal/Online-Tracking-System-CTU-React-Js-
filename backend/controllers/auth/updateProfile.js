const User = require('../../models/User.model');
exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    console.log("User ID from token:", userId); // 🔍

    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const base64Image = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;
    const base64String = `data:${mimeType};base64,${base64Image}`;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: base64String },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'Profile picture updated',
      profilePicture: updatedUser.profilePic,
    });
  } catch (err) {
    next(err)
    console.log(err)
    res.status(500).json({ success: false, error: err.message });
  }
};



