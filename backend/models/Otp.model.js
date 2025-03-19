const { Schema, model } = require("mongoose");

const OtpModelSchema = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
})

module.exports = model('Otp', OtpModelSchema);