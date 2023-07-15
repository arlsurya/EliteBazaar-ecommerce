const mongoose = require('mongoose')

const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

},
    {
        timestamps: true
    })

const user = mongoose.model('users', userSchema)

module.exports = user;