// server side validation

const Joi = require(`joi`);

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        sno : Joi.number().integer().positive().required(),
        userName : Joi.string().min(5).required(),
        Pwd : Joi.string().min(6).max(100).required()
    });

    const {error} = schema.validate(req.body);
    
    if(error){
        return res.status(400).json({
            message : "Bad Request",
            error : error
        })
    }

    next();
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        userName : Joi.string().min(5).required(),
        Pwd : Joi.string().min(4).max(100).required()
    });

    const {error} = schema.validate(req.body);

    if (error){
        return res.status(400)
            .json({ message: "Bad request", error})
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}