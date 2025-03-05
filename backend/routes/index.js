const router = require("express").Router()

const apiRoutes = require("./api/index.js");

router.use("/api", apiRoutes)

router.use("/api", (req, res, next) => {
    next(
        console.log("The route you are trying to access does not exist.")
    );
});

module.exports = router