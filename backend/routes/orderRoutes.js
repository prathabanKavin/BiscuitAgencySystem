const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/authMiddleware')

const { 
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToShipped,
    updateOrderToDelivered,
    getMyOrders, 
    getOrders,
} = orderController

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').get(protect, updateOrderToPaid)
router.route('/:id/ship').get(protect, admin, updateOrderToShipped)
router.route('/:id/deliver').get(protect, admin, updateOrderToDelivered)
 
module.exports = router
