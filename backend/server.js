const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const products = require('./data/products');

dotenv.config();

//database connection
connectDB()

const app = express();

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`))