const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')

// @desc        Create new order
// @route       POST /api/orders
// @access      Private
const addOrderItems = asyncHandler (async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No items selected to order')
        return
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

// @desc        Get Order by ID
// @route       GET /api/orders/:id
// @access      Private
const getOrderById = asyncHandler (async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

module.exports = {addOrderItems, getOrderById}
