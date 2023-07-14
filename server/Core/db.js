const mongoose = require('mongoose')

module.exports = connectDB = ()=>{
    mongoose.connect(`mongodb://${process.env.DBHOST}:${process.env.DBPORT}`,{
        dbName: process.env.DBNAME
    })
    .then(()=>{
        console.log(`database is connected to ${process.env.DBHOST}:${process.env.DBPORT}`)
    })

}

