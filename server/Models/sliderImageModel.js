const mongoose = require('mongoose')
const {Schema} = mongoose;

const sliderImageSchema = new Schema({
    imageName:{
        type:String,
        required:true
    }
})

const sliderImage = mongoose.model('sliders',sliderImageSchema)

module.exports = sliderImage;