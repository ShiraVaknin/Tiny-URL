const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    brand: {
        type: String,
        require: true
    },
    img:{
        type:String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
})

module.exports = mongoose.model('product', ProductSchema)