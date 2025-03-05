const router = require("express").Router()

const authRoutes = require("./Auth.route.js")

router.use("/auth", authRoutes)

module.exports = router