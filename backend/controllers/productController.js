const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

// @desc        Fetch all products
// @route       GET /api/products
// @access      Public
const getProducts = asyncHandler (async (req, res) => {
    const products= await Product.find({})
    res.json(products)
})

// @desc        Fetch single product by id
// @route       GET /api/products/:id
// @access      Public
const getProductById = asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})
// @desc        Delete product
// @route       Delete /api/products/:id
// @access      Private/ admin
const deleteProduct = asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({ message : 'Product Removed'})

    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})  

module.exports = {getProducts, getProductById ,deleteProduct}
