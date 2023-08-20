const express = require('express')
const app = express()
const router = express.Router()
const userRoutes = require('./api/userRoutes')
const adminRoutes = require('./api/adminRoutes')
const fs = require('fs')
const path = require('path')


router.get('/',(req,res)=>{
    res.send('api routes')
})
router.use('/user',userRoutes)
router.use('/admin',adminRoutes)
// this route for fetch images on frontend
router.use('/uploads',express.static(path.join(process.env.ROOT, 'uploads', 'products')))

module.exports = router;