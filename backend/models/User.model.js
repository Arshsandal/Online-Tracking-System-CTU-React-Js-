const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    remember: {
        type: Boolean,
        default: false
    }
});

module.exports = model("User", UserSchema, "users");
