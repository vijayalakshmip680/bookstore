const express=require('express')
const { getAdminBooks, addBook, editBook, deleteBook, getAdminCategories } = require('../../controller/admin/adminBoookController')
const { adminProtect } = require('../../middleware/auth')


const adminBooksRouter=express.Router()

adminBooksRouter.route('/').get(adminProtect,getAdminBooks)
adminBooksRouter.route('/').post(adminProtect,addBook)
adminBooksRouter.route('/categories').get(adminProtect,getAdminCategories)
adminBooksRouter.route('/:bookId').put(adminProtect,editBook)
adminBooksRouter.route('/:bookId').delete(adminProtect,deleteBook)

module.exports=adminBooksRouter