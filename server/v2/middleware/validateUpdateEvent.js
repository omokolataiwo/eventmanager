import { validate } from 'validate.js';
import { validationRules } from '../middleware/validateCreateEvent';

/**
 * Validate event's attributes
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next  - Next middleware
 * @return {*} - Server response
 */
export default (req, res, next) => {
  const updatingField = {};
  const fieldRules = {};

  ['title', 'startDate', 'endDate', 'centerId'].forEach((field) => {
    if (req.body[field]) {
      updatingField[field] = req.body[field];
      fieldRules[field] = validationRules[field];
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
