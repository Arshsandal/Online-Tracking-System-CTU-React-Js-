const {google}=require("googleapis");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_SECRET_KEY = process.env.GOOGLE_SECRET_KEY

exports.oauth2Client =new google.auth.OAuth2(
   GOOGLE_CLIENT_ID,
   GOOGLE_SECRET_KEY,
    "postmessage"
);
