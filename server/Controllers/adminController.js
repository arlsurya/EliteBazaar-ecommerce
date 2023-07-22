const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const bcrypt = require('bcrypt')
const saltRound = 10;
const jwt = require('jsonwebtoken')
const adminModel = require('../Models/adminModel')
const productModel = require('../Models/productModel')
const sliderImageModel = require('../Models/sliderImageModel')
const Constants = require('../Constants')
const Utilities = require('../Utilities');
const fileService = require('../Services/fileService');

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

            let { productName, productPrice, productDiscountedPrice, productDescription, productQuantity, productCategory } = req.body;

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
            if (!productCategory) {
                return res.status(400).json({
                    statusCode: 400,
                    Code: 0,
                    message: "product category is required"
                })
            }
            if (req.files) {

                let productImage = await fileService.uploadImage(req.files.productImage, multi = false, 'product');
                req.body.productImage = productImage;

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
    },

    editProduct: async (req, res) => {
        try {
            let { productId } = req.query
            let { productName, productPrice, productDiscountedPrice, productDescription, productQuantity } = req.body;


            let product = await productModel.findOne({ _id: productId })

            if (!product) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "product not found with this id."
                })
            }

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

            let updateProduct = await productModel.findOneAndUpdate({ _id: req.query.productId }, req.body, { new: true })

            return res.status(200).json({
                statusCode: 200,
                Code: 1,
                message: "product successfully updated."
            })


        }
        catch (error) {
            console.log(error)
            return res.status(409).json({
                statusCode: 409,
                message: "something went wrong!"
            })
        }
    },
    uploadSliderImage: async (req, res) => {
        try {

            let images = await fileService.uploadImage(req.files.sliderImage, multi = false, "slider")

            // multiple files uploaded
            if (typeof images === 'object') {

            
            }
            // single file uploaded
            else {
                req.body.imageName = images

                console.log(req.body)
                let uploadImage = sliderImageModel(req.body)
                uploadImage = uploadImage.save()

                return res.status(200).json({
                    statusCode: 200,
                    Code: 1,
                    message: "Slider images uploaded"
                })
            }




        } catch (error) {
            return res.status(409).json({
                statusCode: 409,
                message: "something went wrong!"
            })

        }
    }
}