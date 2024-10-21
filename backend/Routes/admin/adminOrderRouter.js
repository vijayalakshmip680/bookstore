const express = require('express')
const { getAllOrders, updateOrderStatus } = require('../../controller/admin/adminOrderController')
const { adminProtect } = require('../../middleware/auth')

const adminOrderRouter=express.Router()

adminOrderRouter.route('/').get(adminProtect,getAllOrders)
adminOrderRouter.route('/update-status').put(adminProtect,updateOrderStatus)


module.exports=adminOrderRouter