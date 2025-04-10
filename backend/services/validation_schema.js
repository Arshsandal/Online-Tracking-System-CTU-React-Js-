const Joi = require("joi");

const registrationValidation = Joi.object({
    username: Joi.string().required(),
    dob: Joi.date().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword:Joi.string().required(),
    remember: Joi.boolean(),
    role: Joi.string()
  });


const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(3).max(50),
  remember: Joi.boolean()
})

const addUservalidation = Joi.object({
  username: Joi.string().required(),
    dob: Joi.date().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword:Joi.string().required(),
    remember: Joi.boolean(),
    role: Joi.string().valid('admin', 'user'),
})

const forgotValidation = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordValidation = Joi.object({
  password: Joi.string().min(6).required(),
  confirmPassword:Joi.string().required(),
});

  module.exports = {registrationValidation, loginValidation, forgotValidation, addUservalidation, resetPasswordValidation}