const joi = require('joi');

exports.registerUserValidation = (req , res , next) => {
    const { username , password , email , role, status } = req.body;
    const registerUserValidation = joi.object({
        username : joi.string().trim().min(4).max(15).lowercase().required(),
        email : joi.string().trim().email().lowercase().required(),
        password : joi.string().min(5).max(15).required(),
        role : joi.string().trim().lowercase().required(),
        status : joi.string().trim().lowercase().required(),
    })
    const {error} = registerUserValidation.validate({username, email, password,status,role});

    if(error){
        return res.json({
            status : false,
            message : error.details[0].message
        })
    }
    next();
}

exports.updateUserValidation = async (req , res , next) => {
    const {username , email} = req.body;
    const updateUserValidation = joi.object({
        username : joi.string().trim().min(4).max(15).lowercase().required(),
        email : joi.string().trim().email().lowercase().required(),
        status : joi.string().trim().lowercase().required(),
        role : joi.string().trim().lowercase().required(),
    })
    const {error} = updateUserValidation.validate({username, email});

    if(error){
        return res.json({
            status : false,
            message : error.details[0].message
        })
    }
    next();
}


exports.loginUserValidation = (req , res , next) => {
    const {email , password} = req.body;
    const loginUserValidation = joi.object({
        email : joi.string().trim().email().lowercase().required(),
        password: joi.string().min(5).max(15).required()
    });

    const {error} = loginUserValidation.validate({email, password});

    if(error) {
        return res.json({
            status : false,
            message : error.details[0].message
        })
    }

    next();
}