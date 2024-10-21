const express=require('express')
const { getBooks, getCategories, getBook, serachBook } = require('../controller/booksController')
const { userProtect } = require('../middleware/auth')



const booksRouter=express.Router()

booksRouter.route('/').get(userProtect,getBooks)
booksRouter.route('/search').get(userProtect,serachBook)
booksRouter.route('/categories').get(userProtect,getCategories)
booksRouter.route('/:id').get(userProtect,getBook)


module.exports=booksRouter