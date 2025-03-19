const Joi = require("joi");

const registrationValidation = Joi.object({
    username: Joi.string().required(),
    dob: Joi.date().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword:Joi.string().required(),
    remember: Joi.boolean()
  });


const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(3).max(50),
  remember: Joi.boolean()
})

const forgotValidation = Joi.object({
  email: Joi.string().email().required(),
});

  module.exports = {registrationValidation, loginValidation, forgotValidation}