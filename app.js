const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const bodyParsr = require('body-parser')
const productRouter = require('./Routes/product.router')
const LinkRouter = require('./Routes/LinkRouter')
const UserRouter = require('./Routes/UserRouter')
const LinkController = require('./Controllers/LinkController')
app.use(cors())

app.use(bodyParsr.json())
app.use('/products', productRouter)
app.use('/links', LinkRouter)
app.use('/users', UserRouter)
app.use('/tinyurl/:newurl', LinkController.redirect)

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {
        console.log('connected to db')
    }).catch(err => {
        console.log(err)
    })


app.listen(process.env.PORT, () => { console.log(`listening port ${process.env.PORT}`) })