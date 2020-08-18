const Joi = require('@hapi/joi');

const registerValidation = Joi.object({
    name: Joi.string()
    .min(3)
    .required(),
    lastName: Joi.string()
    .min(3)
    .required(),
    email: Joi.string()
    .email()
    .required(),
    password: Joi.string()
    .min(6)
    .required()
});


const loginSchema= {
    email: Joi.string()
    .email()
    .required(),
    password: Joi.string()
    .min(6)
    .required()
}

const loginValidation = data => {
    return Joi.validate(data, loginSchema)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;