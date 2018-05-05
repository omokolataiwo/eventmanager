import { validate } from 'validate.js';

const rules = {
  username: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    }
  },
  password: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    }
  }
};

/**
 * Validator for sign in
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next  - Next middleware
 * @return {*} - Server response
 */

export default (req, res, next) => {
  const errors = validate(req.body, rules);

  if (errors === undefined) {
    return next();
  }
  return res.status(422).json({
    status: 'error',
    errors: [errors]
  });
};
