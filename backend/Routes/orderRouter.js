const express=require('express')
const { createOrder, getOrders } = require('../controller/orderController')
const { userProtect } = require('../middleware/auth')


const orderRouter=express.Router()


orderRouter.route('/:userId').get(userProtect,getOrders)
orderRouter.route('/').post(userProtect,createOrder)


module.exports=orderRouter