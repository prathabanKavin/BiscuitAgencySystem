const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')

const { getProducts, getProductById, deleteProduct, createProduct, updateProduct , createProductReview, getTopProducts } = productController

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post( protect, createProductReview )
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)
router.get('/top', getTopProducts)

module.exports = router
