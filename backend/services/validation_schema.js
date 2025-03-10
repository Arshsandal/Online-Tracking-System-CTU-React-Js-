const Joi = require("joi");

const registrationValidation = Joi.object({
    username: Joi.string().required(),
    dob: Joi.date().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3).max(50),
    confirmPassword:Joi.string().required(),
    remember: Joi.boolean()
  });


const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(3).max(50),
  remember: Joi.boolean()
})

  module.exports = {registrationValidation, loginValidation}