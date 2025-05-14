const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        required: function () {
          return !this.isGoogleUser; // Only required if not a Google user
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    // password: {
    //     type: String,
    //     required: true,
    //     minlength: 3,
    //     maxlength: 100
    // },
    password: {
        type: String,
        required: function () {
          return !this.isGoogleUser; // Only required if not a Google user
        },
      },
      isGoogleUser: {
        type: Boolean,
        default: false,
      },
    remember: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: String,
       
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

module.exports = model("User", UserSchema, "users");
