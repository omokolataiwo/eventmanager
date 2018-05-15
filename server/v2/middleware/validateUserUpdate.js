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
  const updatingField = {};
  const fieldRules = {};

  ['firstName', 'lastName', 'email', 'phoneNumber'].forEach((field) => {
    if (req.body[field]) {
      updatingField[field] = req.body[field];
      fieldRules[field] = rules[field];
    }
  });

  const errors = validate(updatingField, { ...fieldRules });

  if (errors === undefined) {
    req.body = updatingField;
    return next();
  }
  return res.status(422).json({
    status: 'error',
    errors
  });
};
