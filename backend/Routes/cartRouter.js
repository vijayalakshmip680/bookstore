const express=require('express')
const { addcart, getCart, updateCart, removeCart } = require('../controller/cartController')
const { userProtect } = require('../middleware/auth')

const cartRouter=express.Router()

cartRouter.route('/:userId').get(userProtect,getCart)
cartRouter.route('/:cartId/remove/:bookId').delete(userProtect,removeCart)
cartRouter.route('/').post(userProtect,addcart)
cartRouter.route('/').put(userProtect,updateCart)

module.exports=cartRouter