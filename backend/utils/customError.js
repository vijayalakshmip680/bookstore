
const asyncErrorHandler=(func)=>{
    return(req,res,next)=>{
        func(req,res,next).catch(err=>next(err))
    }
}


class CustomError extends Error{
    constructor(message,statusCode){
        super(message)
        this.message=message
        this.statusCode=statusCode
        this.status=statusCode>400 && statusCode<500 ? 'error': 'failed'
        this.isOperational=true
        Error.captureStackTrace(this,this.constructor)
    }
}

module.exports= {
    CustomError,
    asyncErrorHandler
}