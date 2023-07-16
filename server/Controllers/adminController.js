const bcrypt = require('bcrypt')
const saltRound = 10;
const jwt = require('jsonwebtoken')
const adminModel = require('../Models/adminModel')
const productModel = require('../Models/productModel')
const Constants = require('../Constants')
const Utilities = require('../Utilities')

module.exports = {
    login: async (req, res) => {
        try {
            let { email, password } = req.body

            if (!email) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "email is required"
                })
            }
            if (!password) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "password is required"
                })
            }

            // validate the email 

            if (!Utilities.validateEmail(email)) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "please provide valid email address"
                })
            }

            let admin = await adminModel.findOne({ email: email })
            if (!admin) {
                return res.status(404).json({
                    statusCode: 404,
                    Code: 0,
                    message: "admin not found !"
                })
            }

            // admin found with the provided email section

            // compare provided password and stored password
            comparePassword = await bcrypt.compare(password, admin.password)

            if (!comparePassword) {
                return res.status(401).json({
                    statusCode: 401,
                    Code: 0,
                    message: "email or password is invalid !"
                })
            }

            let payload = {
                id: admin._id
            }

            const authToken = jwt.sign(
                payload,
                Constants.jwtSectet,
                { expiresIn: '7days' }
            )

            return res.status(200).json({
                statusCode: 200,
                Code: 1,
                token: `Bearer ${authToken}`
            })

        } catch (error) {
            console.log(error)
            return res.status(409).json({
                statusCode: 409,
                message: "something went wrong!"
            })

        }
    },
    register: async (req, res) => {
        console.log(req.body)
        try {
            let { fullName, email, mobile, password } = req.body;
            if (!fullName) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "full name is required"
                })
            }
            if (!email) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "email is required"
                })
            }
            if (!mobile) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "mobile is required"
                })
            }
            if (!password) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "password is required"
                })
            }

            let existEmail = await adminModel.findOne({ email: email })
            if (existEmail) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "email is registered with another account"
                })
            }

            let existMobile = await adminModel.findOne({ mobile: mobile })
            if (existMobile) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "mobile is registered with another account"
                })
            }

            let hashedPassword = await bcrypt.hash(req.body.password, saltRound)

            req.body.password = hashedPassword;

            let admin = new adminModel(req.body)
            admin = await admin.save()

            let payload = {
                id: admin._id
            }

            const authToken = jwt.sign(payload, Constants.jwtSectet, {
                expiresIn: '7days'
            })

            return res.status(200).json({
                statusCode: 200,
                Code: 1,
                token: `Bearer ${authToken}`,
                message: 'admin registration sucessfully'
            })

        } catch (error) {
            console.log(error)
            return res.status(400).json({
                statusCode: 400,
                message: "something went wrong"
            })

        }
    },
    changePassword: async (req, res) => {
        try {
            let { oldPassword, newPassword, reNewPassword } = req.body;

            if (!oldPassword) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "old password is required"
                })
            }
            if (!newPassword) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "new password is required"
                })
            }
            if (!reNewPassword) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "re-new password is required"
                })
            }

            // getting data from the admin token 

            let adminId = req.userAuth.id
            console.log(adminId)

            let admin = await adminModel.findOne({ _id: adminId })

            if (!admin) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "admin not found !"
                })
            }

            // compare entered old password with actually old password

            let passwordCheck = await bcrypt.compare(oldPassword, admin.password)

            // if password not match 
            if (!passwordCheck) {
                return res.status(401).json({
                    statusCode: 401,
                    message: "your old password is invalid"
                })
            }

            // check new password and re-new password match
            if (newPassword != reNewPassword) {
                return res.status(401).json({
                    statusCode: 401,
                    message: "new password and the re-entered password do not match."
                })
            }
            // check old password and new password should not same
            if (oldPassword === newPassword) {
                return res.status(401).json({
                    statusCode: 401,
                    message: "new password must be different from the old password."
                })
            }

            let hashedNewPassword = await bcrypt.hash(newPassword, saltRound)
            console.log(hashedNewPassword)

            let updatePassword = await adminModel.findOneAndUpdate({ _id: adminId }, { password: hashedNewPassword })

            if (!updatePassword) {
                return res.status(401).json({
                    statusCode: 401,
                    message: "error while updating the password"
                })
            }

            // if everything works 
            return res.status(200).json({
                statusCode: 200,
                message: "password successfully updated !"
            })

        } catch (error) {
            console.log(error)
            return res.status(409).json({
                statusCode: 409,
                message: "something went wrong!"
            })

        }
    },
    //  Add product section
    addProduct: async (req, res) => {
        try {

            let { productName, productPrice, productDiscountedPrice, productDescription, productQuantity } = req.body;

            if (!productName) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "product name is required"
                })
            }
            if (!productPrice) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "product price is required"
                })
            }
            if (!productDiscountedPrice) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "product discounted price is required"
                })
            }
            if (!productDescription) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "product discription is required"
                })
            }
            if (!productQuantity) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "product quantity price is required"
                })
            }

            let product = new productModel(req.body)

            product = await product.save()

            return res.status(200).json({
                statusCode: 200,
                Code: 1,
                message: "product sucessfully added."
            })



        } catch (error) {
            console.log(error)
            return res.status(409).json({
                statusCode: 409,
                message: "something went wrong!"
            })

        }
    }
}