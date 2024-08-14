const Joi = require(`joi`);

const createEmployeeValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(), // Assuming name is a string, not a number
        email: Joi.string().email().required(), // Email validation
        mobile: Joi.string().pattern(/^[0-9]+$/).required(), // Numeric validation for mobile
        designation: Joi.string().valid('HR', 'sales', 'Manager').required(),
        gender: Joi.string().valid('male', 'female').required(), // Example values for gender
        course: Joi.string().valid('MCA', 'BCA', 'BSC').required(), // Example values for course
        image: Joi.string().pattern(/\.(jpg|jpeg|png)$/).optional(), // Validate image extension
        createDate: Joi.date().optional()
    });

    const {error} = schema.validate(req.body);
    
    if(error){
        return res.status(400).json({
            message : "Bad Request",
            error : error.details
        })
    }

    next();

}

module.exports = {
   createEmployeeValidation
};