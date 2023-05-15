const mongoose = require('mongoose')
const links = require('./LinkModel')

const users = mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    links:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'links',
    }],
})

module.exports = mongoose.model("users", users)
