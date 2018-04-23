import { validate } from 'validate.js';
import { rules } from './validateSignup';

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
    firstName, lastName, email, phoneNumber
  } = rules;

  const errors = validate(req.body, {
    firstName,
    lastName,
    email,
    phoneNumber
  });

  if (errors === undefined) {
    return next();
  }
  return res.status(422).json(errors);
};
