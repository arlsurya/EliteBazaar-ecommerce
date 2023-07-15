const bcrypt = require('bcrypt')
const saltRound = 10
const jwt = require('jsonwebtoken')
const userModel = require('../Models/userModel')
const Constants = require('../Constants')
const Utilities = require('../Utilities')
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

        let existEmail = await userModel.findOne({email:email})
        if(existEmail){
            return res.status(400).json({
                statusCode: 400,
                Code: 0,
                message: "email is registered with another account"
            })
        }

        let existMobile = await userModel.findOne({mobile:mobile})
        if(existMobile){
            return res.status(400).json({
                statusCode: 400,
                Code: 0,
                message: "mobile is registered with another account"
            })
        }

        let hashedPassword = await bcrypt.hash(req.body.password,saltRound)
        
        req.body.password = hashedPassword;
        
        let user = new userModel(req.body)
        user = await user.save()
        
        let payload = {
            id: user._id
        }
        
        const authToken = jwt.sign(payload,Constants.jwtSectet,{
            expiresIn: '7days'
        })

        return res.status(200).json({
            statusCode:200,
            Code:1,
            token: `Bearer ${authToken}`,
            message: 'user registration sucessfully'
        })
 
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                statusCode:400,
                message:"something went wrong"
            })
            
        }
    }
    ,
    login: async(req,res)=>{
        try {
           let {email, password} = req.body

            // if(!email){
            //     return res.status(400).json({
            //         statusCode: 400,
            //         Code: 0,
            //         message: "email is required"
            //     })
            // }
            // if(!password){
            //     return res.status(400).json({
            //         statusCode: 400,
            //         Code: 0,
            //         message: "password is required"
            //     })
            // }

           if(!Utilities.validateEmail(email)){
            console.log('invalid')
           }
           else{
            console.log('valid  ')
            
           }
            
        } catch (error) {
            console.log(error)
            
        }
    }
}