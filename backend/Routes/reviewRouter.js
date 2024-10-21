const express=require('express')
const { addReview } = require('../controller/reviewController')
const { userProtect } = require('../middleware/auth')



const reviewRouter=express.Router()

reviewRouter.route('/').post(userProtect,addReview)

module.exports=reviewRouter