const jwt = require("jsonwebtoken");
const secretKey = process.env.ACCESS_TOKEN_SECRET;

module.exports=(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token, secretKey);
                next();
    }
    catch(error){
        return res.status(401).json({
            message:"Invalid Token !!"
        })
    }
}