const mongoose = require('mongoose')

const links = mongoose.Schema({
    newUrl:{
        type:String,
        require:true
    },
    origionUrl:{
        type:String,
        require:true
    }
});

module.exports =  mongoose.model("links", links)