const express = require('express')
const cors = require('cors')
const app = express()
const cors = require('cors')
const dotenv = require('./env')
const DB = require('./Core/db')
const indexRoutes = require('./Routes/index')
const apiRoutes = require('./Routes/api')
const rateLimit = require('express-rate-limit')
const logger = require('morgan')
const fileUpload = require('express-fileupload')
app.use(cors())

app.use(fileUpload())
DB()


app.disable("x-powered-by");




app.use(express.json())
app.use(logger('dev'))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max:100,

})
app.use(limiter)

app.use('/',indexRoutes)
app.use('/api',apiRoutes)



module.exports = app;