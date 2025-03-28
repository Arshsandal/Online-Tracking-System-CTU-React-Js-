const route = require("express").Router()
const register = require("../../controllers/auth/register.js")
const login = require("../../controllers/auth/login.js")
const forgotPassword = require("../../controllers/auth/forgotPassword.js")
const verifyOtp = require("../../controllers/auth/verifyOtp.js");
const resetPassword = require("../../controllers/auth/resetPassword.js")
const CheckAuth = require("../../middlewares/checkAuth.js")

route.post("/register", register)
route.post("/verifyotp", verifyOtp);
route.post("/forgotPassword", CheckAuth ,forgotPassword)
route.post("/resetPassword", resetPassword)
route.post("/login", login)


module.exports = route