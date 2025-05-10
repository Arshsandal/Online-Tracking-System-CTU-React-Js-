// // authMiddleware.js
// const authenticateToken = (req, res, next) => {
//     const token = req.header("Authorization")?.split(" ")[1];
//     if (!token) {
//       return res.status(403).json({ message: "Access Denied" });
//     }
  
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.status(403).json({ message: "Forbidden" });
//       }
//       req.user = user;
//       next();
//     });
//   };
  
//   // Example usage for a route that requires admin access
//   route.delete('/deleteUser/:id', authenticateToken, async (req, res) => {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Forbidden: Admin rights required" });
//     }
  
//     try {
//       const userId = req.params.id;
//       await User.findByIdAndDelete(userId);
//       res.status(200).json({ message: "User deleted successfully" });
//     } catch (err) {
//       res.status(500).json({ message: "Failed to delete user" });
//     }
//   });
  