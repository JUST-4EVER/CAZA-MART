const joi = require ('joi');
exports.addCustomerProfileValidations = (req,res,next) => {
    const { fname , lname , bio} = req.body;
    const addCustomerProfileValidations = joi.object({
        fname: joi.string().trim().required(),
        lname: joi.string().trim().required(),
        bio: joi.string().trim().required(),
    })

    const { error } = addCustomerProfileValidations.validate({fname , lname , bio});

    if(error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message
        })
    }
    next();
}