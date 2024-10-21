const express=require('express');
const { getAddress, createAddress, setActiveAddress } = require('../controller/addressController');
const { userProtect } = require('../middleware/auth');



const addressRouter= express.Router()

addressRouter.route('/:userId').get(userProtect,getAddress);
addressRouter.route('/').post(userProtect,createAddress);
addressRouter.route('/:userId/activate/:addressId').post(userProtect,setActiveAddress);

module.exports= addressRouter