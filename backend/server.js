const mongoose = require("mongoose");
const express = require("express");
const colors = require("colors");
require("dotenv").config();
const backend = express();
const http = require("http").Server(backend);
const cors = require("cors")
const routes = require("./routes")

backend.use(express.json());

backend.use(cors({
    origin: "*",
    methods : ["GET", "PUT", "PATCH", "POST", "DELETE"]
})
);

backend.use(routes)
backend.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_DB_URI)
.then(() => {
    console.log(colors.green("✓ DB is connected with Backend"));
    const PORT = process.env.PORT
    http.listen(PORT, () => {
        console.log(colors.cyan(`Server is listening on port ${PORT}`));
    });
})
.catch((error) => {
    console.error(colors.red("Error connecting to DB:", error));
});

backend.get("/", (req, res) => {
    res.send("Welcome to the Backend Server!");
});

backend.get("/contact", (req,res)=>{
    res.send("Welcome to the Contact Page")
})