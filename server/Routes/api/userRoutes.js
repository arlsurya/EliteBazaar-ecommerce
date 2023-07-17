const express = require('express')
const app = express()
const router = express.Router()
const isAuth = require('../../Middleware/isAuth')
const userController = require('../../Controllers/userController')

router.get('/', (req,res)=>{
    res.send('user routes')
})

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/changepassword',isAuth, userController.changePassword)
router.get('/product',isAuth, userController.getProductById)


module.exports = router;