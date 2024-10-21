// const client=require('./db')
const express =require('express')
const app =express()
const dotenv=require('dotenv')
dotenv.config({path: './config.env'})
const cors=require('cors')

const {globalErrorHandler} = require('./middleware/globalErrorMiddleWare')

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(express.static('./public'))
const authRouter = require('./Routes/authRouter')
const booksRouter = require('./Routes/booksRouter')
const cartRouter = require('./Routes/cartRouter')
const addressRouter = require('./Routes/addressRoute')
const orderRouter = require('./Routes/orderRouter')
const reviewRouter = require('./Routes/reviewRouter')
const adminBooksRouter = require('./Routes/admin/adminBooksRouter')
const adminOrderRouter = require('./Routes/admin/adminOrderRouter')

const PORT=process.env.PORT || 5000




app.use('/api/v1/users',authRouter)
app.use('/api/v1/books',booksRouter)
app.use('/api/v1/cart',cartRouter)
app.use('/api/v1/address',addressRouter)
app.use('/api/v1/orders',orderRouter)
app.use('/api/v1/review',reviewRouter)
app.use('/api/v1/admin/books',adminBooksRouter)
app.use('/api/v1/admin/orders',adminOrderRouter)


app.use(globalErrorHandler)
app.listen(PORT,()=>{
console.log(`App is running on port ${PORT}`)
})

