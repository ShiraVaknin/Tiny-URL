const router = require('express').Router()
const product = require('../Controllers/product.controller')

router.get('/', product.getAllProducts)
router.post('/', product.addProduct)
router.put('/', product.updateProduct)
router.delete('/:id', product.deleteProduct)

module.exports = router