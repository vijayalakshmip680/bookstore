const pool = require("../db");
const { asyncErrorHandler, CustomError } = require("../utils/customError");

const addReview=asyncErrorHandler(async(req,res,next)=>{
    const { bookId, userId, review, rating } = req.body;

    console.log(req.body)

    // Validate input
    if (!bookId || !userId || !review || rating === undefined) {
        return next(new CustomError('All fields are required', 400));
    }

       // Insert the review into the database
       const result = await pool.query(
        'INSERT INTO books.reviews (bookid, userid, review, rating) VALUES ($1, $2, $3, $4) RETURNING *',
        [bookId, userId, review, rating]
    );

      // Respond with the newly created review
      res.status(201).json({
        status: 'success',
        data: {
            review: result.rows[0],
        },
    });
})


module.exports={
    addReview
}