const route = require("express").Router()
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
const upload = require("../../middlewares/Multer.js")
const { updateProfile } = require('../../controllers/auth/updateProfile.js');
const authMiddleware = require("../../middlewares/authMiddleware.js")
const googleLogin = require("../../controllers/auth/googleLogin.js")


route.post("/register", register)
route.post("/verifyotp", verifyOtp);
route.post("/forgotPassword" ,forgotPassword)
route.post("/resetPassword", resetPassword)
route.post("/login", login)
route.get("/getUsers", checkAuth, getUser)
route.post("/addUser", checkAuth ,addUser)
route.put("/updateUser/:id", updateUser)
route.delete("/deleteUser/:id", deleteUser)
route.put('/updateProfile', authMiddleware , upload, updateProfile);
route.post("/google", googleLogin)

module.exports = route