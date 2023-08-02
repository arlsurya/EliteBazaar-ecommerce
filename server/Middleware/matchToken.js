const userModel = require('../Models/userModel')
module.exports = async(req,res, next)=>{
    try {
        if(!req.userAuth){
            return res.status(200).json({
                statusCode:404,
                Code:0,
                message:'user not found with this token'
            })
        }
        let token = (req.headers.authorization ? req.headers.authorization.replace("Bearer ", "") : "")
        
        console.log(token)
        let user = await userModel.findOne({_id:req.userAuth.id})
        console.log(user)

        let matchToken = user.device.some((device)=>
    
        device.deviceToken == token)
        console.log(matchToken)
        
        if(matchToken){
            next()
        }
        if(!matchToken){

            return res.status(401).json({
                statusCode:401,
                message:'device removed'
            })
        }


    } catch (error) {
        console.log(error)
        
    }
}