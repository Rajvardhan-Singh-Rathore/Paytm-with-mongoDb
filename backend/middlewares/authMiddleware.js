const jwt = require('jsonwebtoken');
const JWT_SECRET = require("../config");

module.exports = function isLoggedIn(req,res,next){
    const tokenString = req.headers.authorization;
    if(!tokenString){
        res.json({message:'token not found! please login to access!'});
        return;
    }
    const token = tokenString.split("Bearer ")[1];
    if(!token){res.json({message:'malformed token string'});return;}
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        if(!decoded.userId){res.status(403).json({message:'malformed token found'});return;}
        req.userid = decoded.userId;
        next();
    }catch(err){console.error(err.message);res.json({message:'invalid token'});return;}
}