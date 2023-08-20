const jwt = require('jsonwebtoken')
const Constants = require('../Constants')

module.exports = (req,res,next)=>{
    console.log(req)
    try {
        let token = (req.headers.authorization ? req.headers.authorization.replace("Bearer ", "") : "") ||
            req.body.token
    
        
            console.log(token)
        // decode the Bearer token 
        const decode = jwt.verify(token,Constants.jwtSectet)
        // if signature valid then store docode value to req.userAuth variable

        req.userAuth = decode;
        next()
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            statusCode: 401,
            Code: 0,
            message: "Your token is expired. Please login again."
        })
        
    }

}