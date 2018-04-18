import { validate } from 'validate.js';
import signupRules from '../validate/signupRules';

/**
 * Validator for updating user
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next  - Next middleware
 * @return {*} - Server response
 */
export default (req, res, next) => {
  const {
    firstName,
    lastName,
    address,
    state,
    email,
    phoneNumber
  } = signupRules;

  const errors = validate(req.body, {
    firstName,
    lastName,
    address,
    state,
    email,
    phoneNumber
  });

  if (errors === undefined) {
    return next();
  }
  return res.status(422).json(errors);
};
