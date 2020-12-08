const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const protect = require('../middleware/authMiddleware')

const { 
    addOrderItems,
    getOrderById, 
} = orderController

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)

module.exports = router
