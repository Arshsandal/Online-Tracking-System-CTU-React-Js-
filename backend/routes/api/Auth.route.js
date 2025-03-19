const route = require("express").Router()
const register = require("../../controllers/auth/register.js")
const login = require("../../controllers/auth/login.js")
const forgotPassword = require("../../controllers/auth/forgotPassword.js")
const verifyOtp = require("../../controllers/auth/verifyOtp.js");

route.post("/register", register)
route.post("/verifyotp", verifyOtp);
route.post("/forgotPassword", forgotPassword)
route.post("/login", login)

module.exports = route