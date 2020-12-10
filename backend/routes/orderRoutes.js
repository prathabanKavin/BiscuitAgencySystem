const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const protect = require('../middleware/authMiddleware')

const { 
    addOrderItems,
    getOrderById,
    updateOrderToPaid, 
} = orderController

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').get(protect, updateOrderToPaid)

module.exports = router
