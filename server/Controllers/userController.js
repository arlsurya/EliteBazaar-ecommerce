const userModel = require('../Models/userModel')
module.exports = {
    register: async(req,res)=>{
        console.log(req.body)
        try {
        let {fullName, email, mobile, password } = req.body;
        if(!fullName){
            return res.status(400).json({
                statusCode: 400,
                Code: 0,
                message: "full name is required"
            })
        }
        if(!email){
            return res.status(400).json({
                statusCode: 400,
                Code: 0,
                message: "email is required"
            })
        }
        if(!mobile){
            return res.status(400).json({
                statusCode: 400,
                Code: 0,
                message: "mobile is required"
            })
        }
        if(!password){
            return res.status(400).json({
                statusCode: 400,
                Code: 0,
                message: "password is required"
            })
        }
            
            
        } catch (error) {
            console.log(error)
            
        }
    }
    ,
    login: async(req,res)=>{
        try {
            res.send('login routes')
            
        } catch (error) {
            console.log(error)
            
        }
    }
}