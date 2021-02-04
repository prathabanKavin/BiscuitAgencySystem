const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/authMiddleware')

const { 
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders, 
    getOrders,
} = orderController

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').get(protect, updateOrderToPaid)
 
module.exports = router
