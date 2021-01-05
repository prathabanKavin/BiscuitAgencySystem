const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const admin = require('../middleware/adminMiddleware')
const protect = require('../middleware/authMiddleware')

const { getProducts, getProductById, deleteProduct } = productController

router.route('/').get(getProducts)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct)

module.exports = router
