import validate from 'validate.js';

export default (req, res, next) => {
  const validationRule = {
    id: {
      presence: {
        allowEmpty: false,
        message: 'is required'
      },
      numericality: true
    }
  };
  const errors = validate({ id: req.params.id }, validationRule);

  if (errors === undefined) {
    return next();
  }
  return res.status(422).json(errors);
};
