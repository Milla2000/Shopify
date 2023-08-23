const joi = require ('joi')

const loginSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: joi.string().required()
})

const registerSchema = joi.object({
    //  username, email, password, phone_number 
    username: joi.string().min(5).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    phone_number: joi.string().required()
})

module.exports = {
    loginSchema,
    registerSchema
}   