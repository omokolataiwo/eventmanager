import Joi from 'joi';

module.exports = {
  body: {
    name: Joi.string()
      .min(2)
      .max(100)
      .required(),
    address: Joi.string()
      .min(5)
      .max(100)
      .required(),
    state: Joi.number()
      .integer()
      .required(),
    capacity: Joi.number()
      .integer()
      .min(5)
      .max(10000)
      .required(),
    ownerid: Joi.number()
      .integer()
      .required(),
    facilities: Joi.string(),
    amount: Joi.number()
      .integer()
      .min(1)
      .max(100000000)
      .required(),
  },
};
