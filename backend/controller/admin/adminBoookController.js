const pool = require("../../db");
const { asyncErrorHandler, CustomError } = require("../../utils/customError");

const getAdminBooks=asyncErrorHandler(async(req,res,next)=>{

    const page=parseInt(req?.query?.page) || 1
    const limit=parseInt(req?.query?.limit) || 10

    const offset=(page-1)*limit

    const {rows}= await pool.query("SELECT * from books.book ORDER BY id LIMIT $1 OFFSET $2",[limit,offset]);

  // Get total count of books
  const totalBooksQuery = await pool.query("SELECT COUNT(*) FROM books.book");
  const totalBooks = parseInt(totalBooksQuery.rows[0].count);

        res.status(200).json(
            {
                status:'success',
                data:{
                    books:rows,
                    totalPages:Math.ceil(totalBooks/limit),
                    currentPage:page,
                    totalBooks
                }
            }
        )
})

const addBook=asyncErrorHandler(async(req,res,next)=>{

    const { authorName, bookName, price, Category, imageUrl, description, quantity } = req.body;

    if(!authorName || !bookName || !price || !Category || !imageUrl || !description || !quantity){
        const error=new CustomError('missing fields',400)
        return next(error)
    }

    const result = await pool.query(
        `INSERT INTO books.book (authorname, bookname, price, category, imageurl, description, quantity)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [authorName, bookName,parseFloat(price), Category, imageUrl, description, parseInt(quantity)]
    );

    res.status(201).json({
        status: 'success',
        data: {
            books: result.rows[0],
        },
    });
})

const editBook = async (req, res, next) => {
    const { bookId } = req.params;
    const { authorName, bookName, price, Category, imageUrl, description, quantity } = req.body;


    if(!bookId || !authorName || !bookName || !price || !Category || !imageUrl || !description || !quantity){
        const error=new CustomError('missing fields',400)
        return next(error)
    }

    const updatedBookQuery = await pool.query(
        `UPDATE books.book
         SET authorname = $1, bookname = $2, price = $3, category = $4, imageurl = $5, description = $6, quantity = $7
         WHERE id = $8
         RETURNING *`,
        [authorName, bookName, parseFloat(price), Category, imageUrl, description, parseInt(quantity), bookId]
    );

    res.status(200).json({
        status: 'success',
        data: {
            book: updatedBookQuery.rows[0], // Return the updated book details
        },
    });

};


const deleteBook=asyncErrorHandler(async(req,res,next)=>{

    const { bookId } = req.params;

    const result = await pool.query(
        `DELETE FROM books.book WHERE id = $1 RETURNING *`, // Return the deleted book details if needed
        [bookId]
    );

    if (result.rowCount === 0) {
        const error=new CustomError('Book not found',404)
        return next(error)
    }

    res.status(200).json({
        status:'success',
        data:{
            book:result.rows[0]
        }
    })
    
})
const getAdminCategories=asyncErrorHandler(async(req,res,next)=>{
    const {rows}=await pool.query("SELECT * FROM books.categories")
    res.status(200).json(
        {
            status:"success",
            data:{
                categories:rows
            }
        }
    )

})

module.exports={
    getAdminBooks,
    addBook,
    editBook,
    deleteBook,
    getAdminCategories
}