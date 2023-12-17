const joi = require('joi');
exports.productValidations = (req,res,next) => {
    const productValidations = joi.object({
        name : joi.string().trim().required(), 
        description:joi.string().trim().required(), 
        price : joi.number().required(), 
        discount:joi.number().required(), 
        quantity:joi.number().required(),
        category_name : joi.string().trim().required(), 
        availibility : joi.string().trim().required(), 
        size : joi.array().trim().required(), 
        color : joi.array().trim().required(), 
        thumbnail : joi.string().trim().required()
    })
    const {error} = productValidations.validate(req.body);
    if(error){
        return res.json({
            status : false,
            message : error.details[0].message
        })
    }
    next();
}