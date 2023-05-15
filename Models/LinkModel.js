const mongoose = require('mongoose')

const links = mongoose.Schema({
    newUrl:{
        type:String,
    },
    origionUrl:{
        type:String,
    },
    clicks:[
        {
            insertDate: Date,
            ipAdress:String
        }
    ]
});

module.exports =  mongoose.model("links", links)