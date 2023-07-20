const path = require('path')
const app = require('./app')

global.appRoot = path.resolve(__dirname)
console.log(appRoot)
app.listen(3001,()=>{
    console.log("server is running on 127.0.0.1:3001")
})