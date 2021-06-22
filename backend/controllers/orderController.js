const asyncHandler = require('express-async-handler')
const { populate } = require('../models/orderModel')
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

// @desc        Update order to paid
// @route       PUT /api/orders/:id/pay
// @access      Private
const updateOrderToPaid = asyncHandler (async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email: req.body.payer.email_address
        }

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc        Update order to shipped
// @route       PUT /api/orders/:id/ship
// @access      Private/Admin
const updateOrderToShipped = asyncHandler (async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isShipped = true
        order.shippedAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc        Update order to delivered
// @route       PUT /api/orders/:id/deliver
// @access      Private/Admin
const updateOrderToDelivered = asyncHandler (async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc        Get logged in user orders
// @route       GET /api/orders/myorders
// @access      Private
const getMyOrders = asyncHandler (async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

// @desc        Get all orders
// @route       GET /api/orders
// @access      Private/Admin
const getOrders = asyncHandler (async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})

module.exports = {addOrderItems, getOrderById, updateOrderToPaid, updateOrderToShipped, updateOrderToDelivered, getMyOrders, getOrders}
