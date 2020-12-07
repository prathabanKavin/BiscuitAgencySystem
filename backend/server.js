const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')

//get config values in the config folder
dotenv.config();
//database connection
connectDB()

const app = express();

//json body parser middleware
app.use(express.json())

//sample api
app.get('/', (req, res) => {
    res.send('API is running...')
})

//routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

//custom middlwares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`))
