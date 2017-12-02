import Joi from 'joi';

module.exports = {
  body: {
    firstname: Joi.string()
      .min(2)
      .max(100)
      .required(),
    lastname: Joi.string()
      .min(2)
      .max(100)
      .required(),
    address: Joi.string()
      .min(2)
      .max(100)
      .required(),
    state: Joi.number()
      .integer()
      .required(),
    phonenumber: Joi.number()
      .integer()
      .required(),
    username: Joi.string()
      .min(2)
      .max(100)
      .required(),
    password: Joi.string()
      .min(2)
      .max(100)
      .required(),
    repassword: Joi.string()
      .required(),
    role: Joi.number()
      .integer()
      .min(1)
      .max(2)
      .required(),
    email: Joi.string()
      .email()
      .required(),
  },
};
