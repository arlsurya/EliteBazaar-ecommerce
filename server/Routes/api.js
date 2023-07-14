const express = require('express')
const app = express()
const router = express.Router()

app.use('/user')
app.use('/admin')

module.exports = router;