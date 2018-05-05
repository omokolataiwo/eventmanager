import { validate } from 'validate.js';

/**
 * Validator parameter ID
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next  - Next middleware
 * @return {*} - Server response
 */
export default (req, res, next) => {
  const validationRule = {
    id: {
      presence: {
        allowEmpty: false,
        message: 'is required'
      },
      numericality: {
        onlyInteger: true,
        strict: true
      }
    }
  };
  const errors = validate({ id: req.params.id }, validationRule);

  if (errors === undefined) {
    return next();
  }
  return res.status(422).json({
    status: 'error',
    errors: [errors]
  });
};
