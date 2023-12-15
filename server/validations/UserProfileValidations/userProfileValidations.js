const joi = require ('joi');
exports.addUserProfileValidations = (req,res,next) => {
    const { fname , lname , bio} = req.body;
    const addUserProfileValidations = joi.object({
        fname: joi.string().required(),
        lname: joi.string().required(),
        bio: joi.string().required(),
    })

    const { error } = addUserProfileValidations.validate({fname , lname , bio});

    if(error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message
        })
    }
    next();
}