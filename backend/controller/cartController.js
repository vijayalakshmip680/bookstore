const pool = require("../db");
const { asyncErrorHandler, CustomError } = require("../utils/customError");

// api for adding cart
const addcart = asyncErrorHandler(async (req, res, next) => {

    const { userId, bookId, quantity } = req.body


    // check if the product exist
    const productQuery = await pool.query("SELECT * from books.book Where id=$1", [bookId])


    if (productQuery.rows.length === 0) {
        const error = new CustomError('Product not found', 404)
        return next(error)
    }

    const product = productQuery.rows[0]




    // check if the user have active cart

    const cartQuery = await pool.query("Select * from books.cart where userid=$1 and status=$2", [userId, 'active'])

    let cartId;

    if (cartQuery.rows.length === 0) {
        // no active cart found , create a new cart

        const newCart = await pool.query("INSERT Into books.cart(userid,status) values ($1,$2) RETURNING id", [userId, 'active'])
        cartId = newCart.rows[0].id
    }
    else {
        // use exitsing cart
        cartId = cartQuery.rows[0].id
    }

    // check if the product is already in the cart

    const cartItemQuery = await pool.query("Select * from books.cartdetails where cartid=$1 and bookid=$2", [cartId, bookId])
    if (cartItemQuery.rows.length > 0) {
        // update the quantity 
        await pool.query("Update books.cartdetails set quantity=quantity+$1 where cartid=$2 and bookid=$3", [quantity, cartId, bookId])
    }
    else {
        // add new item to the cart

        await pool.query("Insert into books.cartdetails (cartid,bookid,quantity,price) values($1,$2,$3,$4)", [cartId, bookId, quantity, product.price])
    }

    // Fetch the updated cart data
    const updatedCartQuery = await pool.query(`
        SELECT cd.*, b.bookname, b.authorname,b.imageurl, c.userid 
        FROM books.cartdetails cd
        JOIN books.book b ON cd.bookid = b.id
        JOIN books.cart c ON cd.cartid = c.id
        WHERE cd.cartid = $1 ORDER BY cd.id
    `, [cartId]);


    res.status(201).json({
        status: "success",
        data: {
            cart:
            {
                cartId: cartId,
                products: updatedCartQuery.rows
            }
        }

    })
})


const getCart = asyncErrorHandler(async (req, res, next) => {

    const userId = req.params.userId;
    // First, get the active cart for the user
    const cartQuery = await pool.query(`
        SELECT * FROM books.cart 
        WHERE userid = $1 AND status = $2
        `, [userId, 'active']);

        if(cartQuery.rows.length===0){
        // Return an error response if no cart is found
        return res.status(404).json({
            status: 'error',
            message: 'No active cart found for this user.',
        });

        }
        else{

            const cartId = cartQuery.rows[0].id;

            // Now get the cart details
            const updatedCartQuery = await pool.query(`
                SELECT cd.*, b.bookname, b.authorname,b.imageurl, c.userid, c.id AS cartid 
                FROM books.cartdetails cd
                JOIN books.book b ON cd.bookid = b.id
                JOIN books.cart c ON cd.cartid = c.id
                WHERE cd.cartid = $1 ORDER BY cd.id
            `, [cartId]);
    
    
            return res.status(200).json({
                status: "success",
                data: {
                    products: updatedCartQuery.rows,
                    cartId: cartId,
                }
            });
        }
})


const updateCart=asyncErrorHandler(async(req,res,next)=>{

    const { userId, bookId, quantity, action } = req.body;

     // Check if the user has an active cart
     const cartQuery = await pool.query("SELECT * FROM books.cart WHERE userid = $1 AND status = $2", [userId, 'active']);
     if (cartQuery.rows.length === 0) {
         return res.status(404).json({ status: 'error', message: 'No active cart found' });
     }

     const cartId = cartQuery.rows[0].id;

     // Get current quantity of the item
     const currentItemQuery = await pool.query("SELECT quantity FROM books.cartdetails WHERE cartid = $1 AND bookid = $2", [cartId, bookId]);
    
     if (currentItemQuery.rows.length === 0) {
        return res.status(404).json({ status: 'error', message: 'Item not found in cart' });
    }

    const currentQuantity = currentItemQuery.rows[0].quantity;

    if (action === "add") {
        // Update quantity for adding
        await pool.query("UPDATE books.cartdetails SET quantity = quantity+$1 WHERE cartid = $2 AND bookid = $3", [quantity, cartId, bookId]);
    } else if (action === "subtract") {

        // Check if we need to remove the item
        if (currentQuantity - quantity <= 0) {
            // Remove the item from the cart
            await pool.query("DELETE FROM books.cartdetails WHERE cartid = $1 AND bookid = $2", [cartId, bookId]);
        } else {
            // Update quantity normally
            await pool.query("UPDATE books.cartdetails SET quantity = quantity-$1 WHERE cartid = $2 AND bookid = $3", [quantity, cartId, bookId]);
        }
    }


        // Fetch the updated cart data
        const updatedCartQuery = await pool.query(`
            SELECT cd.*, b.bookname, b.authorname,b.imageurl, c.userid 
            FROM books.cartdetails cd
            JOIN books.book b ON cd.bookid = b.id
            JOIN books.cart c ON cd.cartid = c.id
            WHERE cd.cartid = $1 ORDER BY cd.id
        `, [cartId]);
    
        res.status(201).json({
            status: "success",
            data: {
                cart:
                {
                    cartId: cartId,
                    products: updatedCartQuery.rows
                }
            }
    
        })

})

const removeCart=asyncErrorHandler(async(req,res,next)=>{

    const { cartId, bookId } = req.params;
    // Remove the item from the cart
    await pool.query("DELETE FROM books.cartdetails WHERE cartid = $1 AND bookid = $2", [cartId, bookId]);

      // Fetch the updated cart data
      const updatedCartQuery = await pool.query(`
        SELECT cd.*, b.bookname, b.authorname,b.imageurl, c.userid 
        FROM books.cartdetails cd
        JOIN books.book b ON cd.bookid = b.id
        JOIN books.cart c ON cd.cartid = c.id
        WHERE cd.cartid = $1 ORDER BY cd.id
    `, [cartId]);

    res.status(201).json({
        status: "success",
        data: {
            cart:
            {
                cartId: cartId,
                products: updatedCartQuery.rows
            }
        }

    })


})


module.exports = {
    addcart,
    getCart,
    updateCart,
    removeCart
}