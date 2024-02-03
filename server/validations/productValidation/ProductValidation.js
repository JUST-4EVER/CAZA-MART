const joi = require('joi');
exports.productValidations = (req, res, next) => {
    const productValidations = joi.object({
        name: joi.string().trim().required(),
        description: joi.string().trim().required(),
        price: joi.number().required(),
        discount: joi.number().required(),
        stock: joi.number().required(),
        category_id: joi.string().trim().required(),
        availibility: joi.string().trim().required(),
        size: joi.array().required(),
        color: joi.array().required(),
        thumbnail: joi.string().required()
    })
    const { error } = productValidations.validate(req.body);
    if (error) {
        return res.json({
            status: false,
            message: error.details[0].message
        })
    }
    next();
}