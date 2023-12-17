const jwt = require('jsonwebtoken');
const { JWT_CUSTOMER_KEY } = require('../lib/lib');
const customerAuthentication = (req , res , next) => {
    const token = req.headers.authorization || req.cookies.customerToken;
    if(!token){
        return res.status(401).json({
            status : false,
            message : 'unauthorized'
        })
    }

    const decoded = jwt.verify(token , JWT_CUSTOMER_KEY);
    req.customerId = decoded.customerId;
    next();
}

module.exports = customerAuthentication;