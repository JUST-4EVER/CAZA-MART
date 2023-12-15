const joi = require('joi');
exports.registerCustomerValidations = (req, res , next) => {
    const registerCustomerValidations = joi.object({
        username : joi.string().trim().lowercase().min(4).max(15).required(), 
        email : joi.string().trim().email().lowercase().required(), 
        password : joi.string().min(5).max(15).required()
    })
    const {error} = registerCustomerValidations.validate(req.body);

    if(error){
        return res.status(400).json({
            status : false,
            message : error.details[0].message
        })
    }
    next();
}

exports.updateCustomerValidations = (req, res , next) => {
    const updateCustomerValidations = joi.object({
        username : joi.string().trim().lowercase().min(4).max(15).required(), 
        email : joi.string().trim().email().lowercase().required(), 
    })
    const {error} = updateCustomerValidations.validate(req.body);

    if(error){
        return res.status(400).json({
            status : false,
            message : error.details[0].message
        })
    }
    next();
}


exports.loginCustomerValidations = (req, res , next) => {
    const registerCustomerValidations = joi.object({
        email : joi.string().trim().email().lowercase().required(), 
        password : joi.string().min(5).max(15).required()
    })
    const {error} = registerCustomerValidations.validate(req.body);

    if(error){
        return res.status(400).json({
            status : false,
            message : error.details[0].message
        })
    }
    next();
}