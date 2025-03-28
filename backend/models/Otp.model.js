const { Schema, model } = require("mongoose");

const OtpSchema = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 }
});

module.exports = model("Otp", OtpSchema);   