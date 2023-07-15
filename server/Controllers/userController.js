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
        console.log(user)
        res.send(user)


    


            
            
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