const express = require('express')
const app = express()
const router = express.Router()
const userRoutes = require('./api/userRoutes')
const adminRoutes = require('./api/adminRoutes')

router.get('/',(req,res)=>{
    res.send('api routes')
})
router.use('/user',userRoutes)
router.use('/admin',adminRoutes)

module.exports = router;