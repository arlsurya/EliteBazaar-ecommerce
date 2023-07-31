const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId
const bcrypt = require('bcrypt')
const saltRound = 10
const jwt = require('jsonwebtoken')
const userModel = require('../Models/userModel')
const productModel = require('../Models/productModel')
const Constants = require('../Constants')
const Utilities = require('../Utilities')
const FileService = require('../Services/fileService')
module.exports = {
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

            let existEmail = await userModel.findOne({ email: email })
            if (existEmail) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "email is registered with another account"
                })
            }

            let existMobile = await userModel.findOne({ mobile: mobile })
            if (existMobile) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "mobile is registered with another account"
                })
            }

            let hashedPassword = await bcrypt.hash(req.body.password, saltRound)

            req.body.password = hashedPassword;

            let user = new userModel(req.body)
            user = await user.save()

            let payload = {
                id: user._id
            }

            const authToken = jwt.sign(payload, Constants.jwtSectet, {
                expiresIn: '7days'
            })

            return res.status(200).json({
                statusCode: 200,
                Code: 1,
                token: `Bearer ${authToken}`,
                message: 'user registration sucessfully'
            })

        } catch (error) {
            console.log(error)
            return res.status(400).json({
                statusCode: 400,
                message: "something went wrong"
            })

        }
    }
    ,
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

            let user = await userModel.findOne({ email: email })
            if (!user) {
                return res.status(404).json({
                    statusCode: 404,
                    Code: 0,
                    message: "user not found !"
                })
            }

            // user found with the provided email section

            // compare provided password and stored password
            comparePassword = await bcrypt.compare(password, user.password)

            if (!comparePassword) {
                return res.status(401).json({
                    statusCode: 401,
                    Code: 0,
                    message: "email or password is invalid !"
                })
            }

            let payload = {
                id: user._id
            }

            const authToken = jwt.sign(
                payload,
                Constants.jwtSectet,
                { expiresIn: '7days' }
            )

            return res.status(200).json({
                statusCode: 200,
                Code: 1,
                token: `Bearer ${authToken}`,
                message: 'user logged in'
            })

        } catch (error) {
            console.log(error)
            return res.status(409).json({
                statusCode: 409,
                message: "something went wrong!"
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

            // getting data from the user token 

            let userId = req.userAuth.id
            console.log(userId)

            let user = await userModel.findOne({ _id: userId })

            if (!user) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "user not found !"
                })
            }

            // compare entered old password with actually old password

            let passwordCheck = await bcrypt.compare(oldPassword, user.password)

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

            let updatePassword = await userModel.findOneAndUpdate({ _id: userId }, { password: hashedNewPassword })

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

    getProductById: async (req, res) => {
        try {
            let { id } = req.query;

            if (!id) {
                return res.status(409).json({
                    statusCode: 409,
                    message: "please provide product id"
                })
            }

            let product = await productModel.findById({ _id: id })

            return res.status(200).json({
                statusCode: 200,
                Code: 1,
                data: product,
                message: "Product details by id"
            })


        } catch (error) {
            console.log(error)
            return res.status(409).json({
                statusCode: 409,
                message: "something went wrong!"
            })

        }
    },

    getProductByParams: async (req, res) => {

        // getting data from the user token 
        let userId = req.userAuth.id
        console.log(userId)
        let { id } = req.params

        try {

            let product = await productModel.findOne({ _id: id })

            if (!product) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Product Not found with this id"
                })

            }

            return res.status(200).json({
                statusCode: 200,
                data: product,
                message: "Product Details ."
            })


        } catch (error) {
            console.log(error)
            return res.status(401).json({
                statusCode: 401,
                message: "Internal Server Error"
            })

        }
    },

    products: async (req, res) => {
        try {
            let { search, category, page, limit, sort, order, skip } = req.query

            page = parseInt(page) || 1;
            limit = parseInt(limit) || 3;
            order = order == 'desc' ? -1 : 1;
            skip = (page - 1) * limit;
            sort = {

                [sort || 'createdAt']: order

            }

            let query = {}

            if(search != undefined && search != ""){
                 query = {
                 "productName": {$regex: ".*" + search + ".*" , $options: 'i'}   
                }
            }
            console.log(query)

            const pipeline = [
                { $match: query },
                {
                    $project:
                    {
                        productName: 1,
                        productDescription: 1,
                        productPrice: 1,
                        productDiscountedPrice: 1,
                        productCategory: 1,
                        productImage: 1
                    }
                },
                { $sort: sort },
                { $skip: skip },
                { $limit: limit }
            ]
            console.log(pipeline)

            let products = await productModel.aggregate(pipeline)

            res.status(200).json({
                statusCode: 200,
                Code: 1,
                message: 'Product list',
                data: { page: page, products }
            })


        } catch (error) {
            console.log(error)


        }
    }


}