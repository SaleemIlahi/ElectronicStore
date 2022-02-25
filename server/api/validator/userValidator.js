
const Joi = require('joi')

const schema = Joi.object({
    name: Joi.string().min(3).max(30).trim().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
})

module.exports = schema