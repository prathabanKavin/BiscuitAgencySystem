const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const admin = require('../middleware/adminMiddleware')
const protect = require('../middleware/authMiddleware')

const { getProducts, getProductById } = productController

//import {protect , admin} from '../middleware/authMiddleware.js'

router.route('/').get(getProducts)
router.route('/:id').get(getProductById).delete(protect, admin, productController.deleteProduct)

module.exports = router
