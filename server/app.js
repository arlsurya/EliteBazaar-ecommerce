const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('./env')
const DB = require('./Core/db')
const indexRoutes = require('./Routes/index')
const apiRoutes = require('./Routes/api')
const logger = require('morgan')
const fileUpload = require('express-fileupload')
app.use(fileUpload())
DB()
app.use(cors)


app.use(express.json())
app.use(logger('dev'))

app.use('/',indexRoutes)
app.use('/api',apiRoutes)



module.exports = app;