const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')

const { getProducts, getProductById, deleteProduct } = productController

router.route('/').get(getProducts)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct)

module.exports = router
