const Joi = require("joi")

exports.categoriesValidation = async(req, res, next) => {
    const {category_name , description} = req.body;
    const categoryValidation = Joi.object({
        category_name : Joi.string().trim().required(),
        description : Joi.string().trim().required()
    })

    const { error } = categoryValidation.validate({category_name , description})

    if(error){
       return  res.status(404).json({ status : false, message : error.details[0].message})
    }

    next();
}