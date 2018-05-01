import { validate } from 'validate.js';

const centerRules = {
  name: {
    presence: {
      allowEmpty: false,
      message: 'is required'
    },
    length: {
      minimum: 4,
      maximum: 120,
      tooShort: 'can not be less than 4 characters.',
      tooLong: 'can not be more than 120 characters.'
    }
  },
  address: {
    presence: {
      allowEmpty: false,
      message: 'is required'
    },
    length: {
      minimum: 4,
      maximum: 120
    }
  },
  state: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    },
    numericality: {
      greaterThan: 0,
      lessThan: 38,
      message: 'code is invalid'
    }
  },
  capacity: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    },
    numericality: {
      greaterThan: 0,
      lessThan: 100000,
      message: '^Invalid center capacity'
    }
  },
  facilities: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    }
  },
  amount: {
    presence: {
      allowEmpty: false,
      message: 'is required'
    },
    numericality: {
      greaterThan: 0,
      lessThan: 100000000,
      message: '^Invalid amount'
    }
  }
};

const contactRules = {
  firstName: {
    presence: {
      allowEmpty: false,
      message: 'is required'
    },
    length: {
      minimum: 4,
      maximum: 120,
      tooShort: 'can not be less than 4 characters.',
      tooLong: 'can not be more than 120 characters.'
    }
  },
  lastName: {
    presence: {
      allowEmpty: false,
      message: 'is required'
    },
    length: {
      minimum: 4,
      maximum: 120,
      tooShort: 'can not be less than 4 characters.',
      tooLong: 'can not be more than 120 characters.'
    }
  },
  phoneNumber: {
    presence: {
      allowEmpty: false,
      message: 'is required'
    },
    length: {
      is: 11,
      wrongLength: 'must be 11 digits'
    },
    numericality: true
  },
  email: {
    presence: {
      allowEmpty: false,
      message: 'address is required'
    },
    email: {
      message: 'is not a valid email address'
    }
  }
};

/**
 * Validator for sign up
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next  - Next middleware
 * @return {*} - Server response
 */

export default (req, res, next) => {
  const center = req.body;
  const errors = [];

  const centerErrors = validate(center, centerRules);

  if (centerErrors) errors.push(centerErrors);

  if (center.newContact && center.contact) {
    const contactErrors = validate(center.contact, contactRules);

    if (contactErrors) errors.push(contactErrors);
  }
  if (errors.length) {
    return res.status(422).json({
      status: 'error',
      errors
    });
  }
  return next();
};
