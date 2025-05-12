// controllers/auth/uploadProfilePic.js

const User = require('../../models/User.model'); // adjust path

exports.uploadProfilePic = async (req, res) => {
  try {
    const userId = req.user?.id; // Optional chaining avoids crash

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: imagePath },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Profile picture updated successfully',
      image: updatedUser.image,
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
