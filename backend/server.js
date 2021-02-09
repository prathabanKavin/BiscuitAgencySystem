const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

//get config values in the config folder
dotenv.config();
//database connection
connectDB()

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

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
app.use('/api/upload', uploadRoutes)

//api to retrieve payhere merchant id
app.get('/api/config/payhere', (req, res) =>
    res.send(process.env.PAYHERE_MERCHANT_ID)
)

//making uploads folder static to be accessible to everyone
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//custom middlwares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`))
