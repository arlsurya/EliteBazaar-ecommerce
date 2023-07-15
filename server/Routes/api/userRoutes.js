const express = require('express')
const app = express()
const router = express.Router()
const userController = require('../../Controllers/userController')

router.get('/', (req,res)=>{
    res.send('user routes')
})

router.post('/register', userController.register)
router.post('/login', userController.login)


module.exports = router;