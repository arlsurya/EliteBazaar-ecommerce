const express = require('express')
const app = express()
const router = express.Router()
const isAuth = require('../../Middleware/isAuth')
const userController = require('../../Controllers/userController')
const matchToken = require('../../Middleware/matchToken')

router.get('/', (req,res)=>{
    res.send('user routes')
})

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/changepassword',isAuth, userController.changePassword)
router.get('/product',isAuth,matchToken, userController.getProductById)
router.get('/product/:id',isAuth, userController.getProductByParams)
router.get('/products/', userController.products)

// order
router.post('/order',isAuth,matchToken, userController.orderProduct)




module.exports = router;