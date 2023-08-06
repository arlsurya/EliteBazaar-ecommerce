const mongoose = require('mongoose')
const { Schema } = mongoose

const transactionSchema = new Schema({
    transactionId: {
        type: String,
    },
    productName:{
        type:String
    },
    productAmount: {
        type: Number
    },
    productQuantity:{
        type:Number
    },
    transactionAmount: {
        type: Number
    },
    paymentGateway: {
        type: String
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'products'
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users'

    }
},
    { timestamps: true })


const transaction = mongoose.model('transaction',transactionSchema)

module.exports = transaction;