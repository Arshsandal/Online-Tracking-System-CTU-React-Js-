const route = require("express").Router()
const multer = require('multer');
const register = require("../../controllers/auth/register.js")
const login = require("../../controllers/auth/login.js")
const forgotPassword = require("../../controllers/auth/forgotPassword.js")
const verifyOtp = require("../../controllers/auth/verifyOtp.js");
const resetPassword = require("../../controllers/auth/resetPassword.js")
const checkAuth = require("../../middlewares/checkAuth.js");
const getUser = require("../../controllers/auth/getUsers.js");
const addUser = require("../../controllers/auth/addUser.js")
const updateUser = require("../../controllers/auth/updateUser.js")
const deleteUser = require("../../controllers/auth/deleteUser.js")
const path = require('path');
const { uploadProfilePic } = require('../../controllers/auth/uploadProfilePic.js');





const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `profile_${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only JPG, JPEG, PNG files allowed'), false);
  }
});




route.post("/register", register)
route.post("/verifyotp", verifyOtp);
route.post("/forgotPassword" ,forgotPassword)
route.post("/resetPassword", resetPassword)
route.post("/login", login)
route.get("/getUsers", checkAuth, getUser)
route.post("/addUser", checkAuth ,addUser)
route.put("/updateUser/:id", updateUser)
route.delete("/deleteUser/:id", deleteUser)
route.put('/update-profile', upload.single('image'), uploadProfilePic);

module.exports = route