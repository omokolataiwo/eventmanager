import validate from 'validate.js';

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
    page: {
      numericality: {
        onlyInteger: true,
        strict: true,
        message: '^Invalid query string for page',
        greaterThan: 0
      },
    }
  };
  const constriant = {};
  Object.keys(req.query).forEach((field) => {
    constriant[field] = req.query[field];
  });
  const errors = validate(constriant, validationRule);

  if (errors === undefined) {
    return next();
  }
  return res.status(422).json({
    status: 'error',
    message: 'Request query validation error',
    errors
  });
};
