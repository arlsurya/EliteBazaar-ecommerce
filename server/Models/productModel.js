const mongoose = require('mongoose')
const {Schema} = mongoose;

const productSchema = new Schema({
    productName:{
        type: String,
        required: true,
    },
    productDescription:{
        type: String,
        required: true
    },
    productPrice:{
        type: String,
        required: true
    },
    productDiscountedPrice:{
        type: String,
        required: true
    },
    productQuantity:{
        type: Number,
        required: true
    },
    productImage:{
        type: String,
        required:true
    }
},
{
    timestamps:true
})

const product = mongoose.model('products',productSchema)

module.exports = product;