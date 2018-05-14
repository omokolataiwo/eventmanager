import { validate } from 'validate.js';

export const rules = {
  firstName: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    },
    length: {
      minimum: 4
    }
  },
  lastName: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    }
  },
  email: {
    presence: {
      allowEmpty: false,
      message: 'address is required'
    },
    email: {
      message: 'is not a valid email address'
    }
  },
  phoneNumber: {
    presence: {
      allowEmpty: false,
      message: 'is required'
    },
    numericality: {
      onlyInteger: true,
    },
    length: {
      is: 11
    }
  },
  username: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    },
    length: {
      minimum: 4,
      maximum: 120,
      tooShort: 'should be at least 4 characters'
    }
  },
  role: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    },
    inclusion: {
      within: { 2: 'Admin', 3: 'User' },
      message: '^Invalid role'
    }
  },
  password: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    },
    length: {
      minimum: 2,
      maximum: 100,
      tooShort: 'is too short',
      tooLong: 'is too long'
    }
  },
  matchPassword: {
    equality: {
      attribute: 'password',
      message: v => validate.format('is not the same as Password', { v })
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
  const errors = validate(req.body, rules);

  if (errors === undefined) {
    return next();
  }
  return res.status(422).json({
    status: 'error',
    errors: [errors]
  });
};
