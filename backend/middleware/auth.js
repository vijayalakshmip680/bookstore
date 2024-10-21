const jwt=require('jsonwebtoken');
const { CustomError } = require('../utils/customError');

exports.userProtect = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.includes('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            try{
                const decoded = jwt.verify(token, process.env.SECRET);
                req.user = decoded;
                // Check if the user is not an admin
                if (req?.user && !req?.user?.isadmin) {
                     next();
                } else {
                    const error= new CustomError('unauthorized',401)
                     next(error)
                }

            }
            catch(e){
                const error = new CustomError('Unauthorized', 401);
                next(error);
            }

        } else {
            const error = new CustomError('Unauthorized', 401);
            next(error);
        }
    } else {
        const error = new CustomError('Unauthorized', 401);
         next(error);
    }
};

exports.adminProtect = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.includes('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET);
            req.user = decoded;
            // Check if the user is an admin
            if (req?.user?.isadmin) {
                next();
            } else {
                return res.status(403).json({ message: 'Access denied: Users are not allowed.' });
            }
        } else {
            const error = new CustomError('Unauthorized', 401);
            next(error);
        }
    } else {
        const error = new CustomError('Unauthorized', 401);
        next(error);
    }
};
