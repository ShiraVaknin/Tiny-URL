const Product = require('../Models/product.model')

const getAllProducts = (req, res) => {
    Product.find()
        .then(Products => {
            res.send(Products)
        }).catch(err => {
            console.log(err)
        })
}

const addProduct = (req, res) => {
    const newProduct = new Product(req.body)
    newProduct.save()
        .then(product => {
            res.send(product)
        }).catch(err => {
            console.log(err)
        })
}

const updateProduct = (req, res) => {
    Product.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(updatedProduct => {
            res.send(updatedProduct)
        }).catch(err => {
            console.log(err)
        })
}

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        res.send(deletedProduct)
    } catch (err) {
        console.log(err)
    }
}


module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct }