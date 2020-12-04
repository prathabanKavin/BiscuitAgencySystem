const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

const { getProducts, getProductById } = productController

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

module.exports = router
