const pool = require("../../db");
const { asyncErrorHandler } = require("../../utils/customError");

const getAllOrders = asyncErrorHandler(async (req, res, next) => {


    const query = `
    SELECT o.id AS orderId, o.userid, o.status, o.total,o.orderdate,
           od.quantity, b.id AS bookId, b.bookname, b.authorname, b.price
    FROM books.orders o
    JOIN books.orderdetails od ON o.id = od.orderid
    JOIN books.book b ON od.bookid = b.id
    ORDER BY o.orderdate DESC
`;

    const { rows } = await pool.query(query);

    // Transform the data to group products by order
    const orders = {};

    rows.forEach(row => {
        const { orderid, userid, status, total, quantity, bookid, bookname, authorname, price,orderdate } = row;

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
            price
        });
    });


    // Convert orders object to an array
    const result = Object.values(orders);
    res.status(200).json({
        status: 'success',
        data: {
            orders: result,
        },
    });


})


const updateOrderStatus = asyncErrorHandler(async (req, res, next) => {
    const { orderId, newStatus } = req.body;

 
        // Step 1: Update the order status
        const updateOrderQuery = await pool.query(
            `UPDATE books.orders 
             SET status = $1 
             WHERE id = $2`,
            [newStatus, orderId]
        );

        // Step 2: If the status is changed to 'Shipped', update book quantities
        if (newStatus === 'Shipped') {
            const orderDetailsQuery = await pool.query(
                `SELECT od.bookid, od.quantity 
                 FROM books.orderdetails od 
                 WHERE od.orderid = $1`,
                [orderId]
            );

            const quantityUpdatePromises = orderDetailsQuery.rows.map(item => {
                return pool.query(
                    `UPDATE books.book 
                     SET quantity = quantity - $1 
                     WHERE id = $2`,
                    [item.quantity, item.bookid]
                );
            });

            // Wait for all updates to complete
            await Promise.all(quantityUpdatePromises);
        }

        res.status(200).json({
            status: 'success',
            data:{
            message:'Status Updated',
            orderId:orderId,
            orderStatus:newStatus
            }
        });
});



module.exports={
    getAllOrders,
    updateOrderStatus
}