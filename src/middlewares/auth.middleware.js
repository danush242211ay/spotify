const jwt = require('jsonwebtoken')


async function authArtist(req,res,next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message : "unauthorised"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(decoded.role !== "artist"){
            return res.status(403).json({message : "You don't have access to create an music"})
        }
        req.user = decoded;

        next();
    }
    catch(err){
        return res.status(401).json({message : "unauthorised1"})
    }

}

module.exports = {authArtist}