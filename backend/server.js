const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const productRoutes = require('./routes/productRoutes')

dotenv.config();

//database connection
connectDB()

const app = express();

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`))