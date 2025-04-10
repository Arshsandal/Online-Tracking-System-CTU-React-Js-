const route = require("express").Router()
const register = require("../../controllers/auth/register.js")
const login = require("../../controllers/auth/login.js")
const forgotPassword = require("../../controllers/auth/forgotPassword.js")
const verifyOtp = require("../../controllers/auth/verifyOtp.js");
const resetPassword = require("../../controllers/auth/resetPassword.js")
const checkAuth = require("../../middlewares/checkAuth.js");
const getUser = require("../../controllers/auth/getUsers.js");
const addUser = require("../../controllers/auth/addUser.js")

route.post("/register", register)
route.post("/verifyotp", verifyOtp);
route.post("/forgotPassword" ,forgotPassword)
route.post("/resetPassword", resetPassword)
route.post("/login", login)
route.get("/getUsers", checkAuth, getUser)
route.post("/addUser", checkAuth ,addUser)


module.exports = route