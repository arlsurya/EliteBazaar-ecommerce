const express = require('express')
const app = express()
const router = express.Router()
const adminController = require('../../Controllers/adminController')
const isAuth = require('../../Middleware/isAuth')

router.get('/', (req,res)=>{
    res.send('admin routes')
}),

router.post('/register',adminController.register)
router.post('/login',adminController.login)
router.post('/changepassword',isAuth,adminController.changePassword)
router.post('/addproduct',isAuth,adminController.addProduct)
router.post('/editproduct',isAuth, adminController.editProduct)
router.post('/uploadSliderImage',isAuth, adminController.uploadSliderImage)

// add category
router.post('/addcategory',isAuth,adminController.addCategory)

module.exports = router;