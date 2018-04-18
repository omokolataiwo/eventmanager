import { validate } from 'validate.js';
import signupRules from '../validate/signupRules';

/**
 * Validator for sign up
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next  - Next middleware
 * @return {*} - Server response
 */

export default (req, res, next) => {
  const errors = validate(req.body, signupRules);

  if (errors === undefined) {
    return next();
  }
  return res.status(422).json(errors);
};
