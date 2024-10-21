const pool = require("../db");
const { asyncErrorHandler } = require("../utils/customError");

const getAddress=asyncErrorHandler(async(req,res,next)=>{
    const userId = req.params.userId;
    const addressQuery = await pool.query(`
        SELECT *
        FROM books.address
        WHERE userid = $1 ORDER BY id
    `, [userId]);
    if (addressQuery.rows.length === 0) {
        return res.status(404).json({ status: "error", message: "Address not found" });
    }
    res.status(200).json({
        status: "success",
        data: {
            address: addressQuery.rows
        }
    });
})


const createAddress=asyncErrorHandler(async(req,res,next)=>{

    const {userid,house,area,city,pin,active} = req.body

    console.log(userid,house,area,city,pin,active)

    // Check if all required fields are provided
    if (!userid || !house || !city || !area || !pin || !active) {
        return res.status(400).json({ status: "error", message: "All fields are required." });
    }


      // Check if there are existing addresses for the user
      const existingAddressesQuery = await pool.query(`
        SELECT * FROM books.address WHERE userid = $1
    `, [userid]);


     // If there are existing addresses, deactivate them
     if (existingAddressesQuery.rows.length > 0) {
        await pool.query(`
            UPDATE books.address
            SET active = 0
            WHERE userid = $1
        `, [userid]);
    }

    // Insert the new address into the database
    await pool.query(`
        INSERT INTO books.address (userid, house, city, area, pin, active)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `, [userid, house, city, area, pin, active]);

    const addressQuery = await pool.query(`
        SELECT *
        FROM books.address
        WHERE userid = $1 ORDER BY id
    `, [userid]);

    res.status(200).json({
        status: "success",
        data: {
            address: addressQuery.rows
        }
    });
})


const setActiveAddress=asyncErrorHandler(async(req,res,next)=>{
    const userId = req.params.userId;
    const addressId = req.params.addressId;

    // Set all addresses to inactive for the user
    await pool.query(`
        UPDATE books.address 
        SET active = 0 
        WHERE userid = $1
    `, [userId]);

    // Set the selected address to active
    await pool.query(`
        UPDATE books.address 
        SET active = 1 
        WHERE id = $1 AND userid = $2
    `, [addressId, userId]);

    const addressQuery = await pool.query(`
        SELECT *
        FROM books.address
        WHERE userid = $1 ORDER BY id
    `, [userId]);
    res.status(200).json({
        status: "success",
        data: {
            address: addressQuery.rows
        }
    });

})
module.exports={
    getAddress,
    createAddress,
    setActiveAddress
}