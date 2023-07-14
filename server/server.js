const express = require('express')
const app = express()
const dotenv = require('./env')
const DB = require('./Core/db')
DB()
app.listen(3001,()=>{
    console.log("server is running on 127.0.0.1:3001")
})