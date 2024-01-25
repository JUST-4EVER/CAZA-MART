const jwt = require('jsonwebtoken');
const { JWT_USER_KEY } = require('../lib/lib');
const userAuthentication = (req , res , next) => {
    const token = req.headers.authorization || req.cookies.UserToken;
    if(!token) {
        return res.status(401).json({
            status : false,
            message : 'unauthorized'
        })
    }
    const decoded = jwt.verify(token , JWT_USER_KEY);
    req.userId = decoded.userId;
    next();
}

module.exports = userAuthentication;