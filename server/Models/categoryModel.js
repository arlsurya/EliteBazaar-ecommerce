const mongoose = require('mongoose')
const {Schema} = mongoose

const categorySchema = new Schema({
    categoryName:{
        type:String,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    }
},
{timestamps:true}
)

const category = mongoose.model('category',categorySchema)

module.exports = category;