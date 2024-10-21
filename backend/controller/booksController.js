const pool = require("../db");
const { asyncErrorHandler, CustomError } = require("../utils/customError");

const getBooks=asyncErrorHandler(async(req,res,next)=>{

    const page=parseInt(req?.query?.page) || 1
    const limit=parseInt(req?.query?.limit) || 10
    const categoryId=req?.query?.categoryId


    const offset=(page-1)*limit

    let query="SELECT b.*,c.category as categoryname FROM books.book b left join books.categories c on b.category=c.id";

    let queryParams=[]
    if(categoryId){
        query+=" Where b.category=$1";
        queryParams.push(parseInt(categoryId))
    }

    const limitIndex = queryParams.length + 1;
    query+=` ORDER BY b.id LIMIT $${limitIndex} OFFSET $${limitIndex + 1}`;
    queryParams.push(limit,offset)


    const {rows}=await pool.query(query,queryParams)
    const totalBooksQuery=categoryId ? await pool.query("Select COUNT(*) from books.book where category=$1",[categoryId]):
    await pool.query("Select count(*) from books.book")

    const totalBooks=parseInt(totalBooksQuery.rows[0].count)

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


const getCategories=asyncErrorHandler(async(req,res,next)=>{
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

const getBook=asyncErrorHandler(
    async(req,res,next)=>{
       

        const id=req.params.id
        const { rows } = await pool.query(`
            SELECT b.*, 
                   (SELECT AVG(r.rating) 
                    FROM books.reviews r 
                    WHERE r.bookid = b.id) AS average_rating 
            FROM books.book b 
            WHERE b.id = $1
        `, [id]);
        res.status(200).json({
            status:"success",
            data:{
                book:rows[0]
            }
        })
    }
)

const serachBook=asyncErrorHandler(async(req,res,next)=>{

    const query=req.query.query

    
    // const searchQuery = `SELECT * FROM books.book  WHERE  authorname ILIKE $1 OR bookname ILIKE $1`;
    const searchQuery = `
    SELECT b.* ,c.category as categoryname
    FROM books.book b
    LEFT JOIN books.categories c ON b.category = c.id
    WHERE b.authorname ILIKE $1 
       OR b.bookname ILIKE $1 
       OR c.category ILIKE $1`;

    const searchTerm=`%${query}%`; // Adding wildcards for partial matches

    const { rows } = await pool.query(searchQuery, [searchTerm]);

    res.status(200).json(
        {
            status:"success",
            data:{
                books:rows
            }
        }
    )

})
module.exports={
    getBooks,
    getCategories,
    getBook,
    serachBook
}





// Add product to cart API
// app.post('/cart/add', async (req, res) => {
//     const { userId, productId, quantity } = req.body;
  
//     try {
//       // Check if the product exists and get its current price
//       const productQuery = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
//       if (productQuery.rows.length === 0) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
//       const product = productQuery.rows[0];
  
//       // Check if the user has an active cart
//       const cartQuery = await pool.query(
//         'SELECT * FROM carts WHERE user_id = $1 AND status = $2',
//         [userId, 'active']
//       );
//       let cartId;
  
//       if (cartQuery.rows.length === 0) {
//         // No active cart found, create a new one
//         const newCart = await pool.query(
//           'INSERT INTO carts (user_id) VALUES ($1) RETURNING id',
//           [userId]
//         );
//         cartId = newCart.rows[0].id;
//       } else {
//         // Use existing active cart
//         cartId = cartQuery.rows[0].id;
//       }
  
//       // Check if the product is already in the cart
//       const cartItemQuery = await pool.query(
//         'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2',
//         [cartId, productId]
//       );
  
//       if (cartItemQuery.rows.length > 0) {
//         // Update quantity if the item is already in the cart
//         await pool.query(
//           'UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3',
//           [quantity, cartId, productId]
//         );
//       } else {
//         // Add new item to the cart
//         await pool.query(
//           'INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
//           [cartId, productId, quantity, product.price]
//         );
//       }
  
//       res.status(200).json({ message: 'Product added to cart successfully' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'An error occurred while adding the product to the cart' });
//     }
//   });
  
//   // Start the server
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(Server running on port ${PORT});
//   });