const pool = require("../db");
const { asyncErrorHandler } = require("../utils/customError");

const createOrder=asyncErrorHandler(async(req,res,next)=>{

    const { userId, addressId, cartId } = req.body;
    const orderDate = new Date().toISOString();



    // Step 1: Get cart items along with their prices
    const cartDetailsQuery = await pool.query(`
        SELECT cd.bookid, cd.quantity, b.price
        FROM books.cartdetails cd
        JOIN books.book b ON cd.bookid = b.id
        WHERE cd.cartid = $1
    `, [cartId]);


     // Step 2: Calculate the total price
     const orderTotal = cartDetailsQuery.rows.reduce((total, item) => {
        return total + (item.price * item.quantity); // Calculate total based on price and quantity
    }, 0);


     // Step 3: Create a new order with the total
     const orderQuery = await pool.query(`
        INSERT INTO books.orders (status, addressid, userid, cartid, orderdate, total) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING id
    `, ['Order Placed', addressId, userId, cartId, orderDate, orderTotal]);

    const orderId = orderQuery.rows[0].id;


    // Step 4: Insert into order_details for each book in the cart
    const orderDetailsPromises = cartDetailsQuery.rows.map(item => {
        return pool.query(`
            INSERT INTO books.orderdetails (bookid, orderid, quantity) 
            VALUES ($1, $2, $3)
        `, [item.bookid, orderId, item.quantity]);
    });

     // Wait for all order detail insertions to complete
     await Promise.all(orderDetailsPromises);

     // Step 5: Update the cart status to inactive
     await pool.query(`
         UPDATE books.cart 
         SET status = 'inactive' 
         WHERE id = $1
     `, [cartId]);

    res.status(201).json({
        status: 'success',
        data: {
            orderId,
            message: 'Order created successfully!',
        },
    });

})


const getOrders=asyncErrorHandler(async(req,res,next)=>{
const { userId } = req.params;

const query = `
SELECT o.id AS orderId, o.userid, o.status, o.total,o.orderdate,
       od.quantity, b.id AS bookId, b.bookname, b.authorname, b.price,b.imageurl
FROM books.orders o
JOIN books.orderdetails od ON o.id = od.orderid
JOIN books.book b ON od.bookid = b.id WHERE o.userid = $1
ORDER BY o.orderdate DESC
`;

const { rows } = await pool.query(query, [userId]);



const orders = {};

rows.forEach(row => {
    const { orderid, userid, status, total, quantity, bookid, bookname, authorname, price,orderdate,imageurl } = row;

    if (!orders[orderid]) {
        orders[orderid] = {
            id: orderid,
            userID: userid,
            status,
            total,
            orderdate,
            products: [],
        };
    }

    // Add product details to the products array
    orders[orderid].products.push({
        bookID: bookid,
        bookName: bookname,
        authorName: authorname,
        quantity,
        price,
        imageurl
    });
});
 // Convert orders object to an array
 const result = Object.values(orders);

res.status(200).json({
    status: 'success',
    data: {
        orders:result
    },
});

})


module.exports={
    createOrder,
    getOrders
}