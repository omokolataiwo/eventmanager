import Joi from 'joi';

module.exports = {
  params: {
    id: Joi.number()
      .integer(),
  },
};
