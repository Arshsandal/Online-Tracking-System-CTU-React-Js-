const route = require("express").Router()

const register = require("../../controllers/auth/register.js")

route.post("/register", register)

module.exports = route