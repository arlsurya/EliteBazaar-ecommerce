const bcrypt = require('bcrypt')
const saltRound = 10
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

        let hashedPassword = await bcrypt.hash(req.body.password,saltRound)
        
        req.body.password = hashedPassword;
        console.log(req.body.password)
        

            
            
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