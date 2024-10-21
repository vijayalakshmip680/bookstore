const pool = require("../db")
const { asyncErrorHandler, CustomError } = require("../utils/customError")
const createToken = require("../utils/jwt")


// user registration api
const register= asyncErrorHandler(async(req,res,next)=>{

    
    const {firstname,lastname,username,password}=req.body

    // checking all the fields
    if(!firstname || !lastname || !username  || !password){
        const error=new CustomError('missing fields',400)
        return next(error)
    }
    // checking for existing username
    const result= await pool.query('Select * from books.user where username=$1',[username])

    if(result.rowCount>0){
        const error=new CustomError('username existed',400)
        return next(error)
    }
    // createing a new user
    const user=await pool.query('Insert into books.user (firstname,lastname,username,password,isadmin) values ($1,$2,$3,$4,$5) RETURNING *',
        [firstname,lastname,username,password,false])

        if(user.rows[0]){
            const {username,firstname,lastname,password,id,isadmin}=user.rows[0]
            res.status(201).json({
                status:'success',
                data:{
                    user:user.rows[0],
                    token:createToken(
                        {
                            id,
                            firstname,
                            lastname,
                            username,
                            isadmin,
                            password
                        }
                    )
                }
            })
        }
})

// login api
const login =asyncErrorHandler(async(req,res,next)=>{

    const {username,password}=req.body

    if(!username || !password){
        const error= new CustomError('provide all fields')
       return next(error)
    }

      // checking for user
      const result= await pool.query('Select * from books.user where username=$1',[username])

      if(result.rowCount>0 && result.rows[0].password===password){

        res.status(200).json(
            {
                status:'success',
                data:{
                    user:result.rows[0],
                    token:createToken({
                        id:result.rows[0].id,
                        firstname:result.rows[0].firstname,
                        lastname:result.rows[0].lastname,
                        username:result.rows[0].username,
                        password:result.rows[0].password,
                        isadmin:result.rows[0].isadmin,

                    })

                }
            }
        )
      }
      else{
        const error=new CustomError('Invalid User')
        return next(error)
      }
    


})
module.exports={
    register,
    login
}