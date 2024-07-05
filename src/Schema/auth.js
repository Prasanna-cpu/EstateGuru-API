import Joi from "joi"

export const registerSchema=Joi.object({
    email:Joi.string().min(1).max(50).required(),
    password:Joi.string().min(6).required(),
    username:Joi.string().min(3).max(40).required()
})

export const loginSchema=Joi.object({
    password:Joi.string().min(6).required(),
    username:Joi.string().min(3).max(40).required()
})


