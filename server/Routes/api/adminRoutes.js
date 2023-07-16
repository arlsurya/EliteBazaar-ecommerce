const express = require('express')
const app = express()
const router = express.Router()
const adminController = require('../../Controllers/adminController')

router.get('/', (req,res)=>{
    res.send('admin routes')
}),

router.post('/register',adminController.register)

module.exports = router;