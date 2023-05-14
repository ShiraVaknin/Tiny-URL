const mongoose = require('mongoose')

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
    links:{
        type:[],
    },
})

module.exports = mongoose.model("users", users)