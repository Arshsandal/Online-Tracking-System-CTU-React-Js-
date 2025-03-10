const route = require("express").Router()

const register = require("../../controllers/auth/register.js")
const login = require("../../controllers/auth/login.js")

route.post("/register", register)
route.post("/login", login)

module.exports = route