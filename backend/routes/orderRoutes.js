const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const protect = require('../middleware/authMiddleware')

const { 
    addOrderItems, 
} = orderController

router.route('/').post(protect, addOrderItems)

module.exports = router
