const express=require('express')
const { register, login } = require('../controller/authController')


const authRouter= express.Router()

authRouter.route('/register').post(register)
authRouter.route('/login').post(login)

module.exports= authRouter