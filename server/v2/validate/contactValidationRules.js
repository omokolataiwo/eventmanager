import { validate } from 'validate.js';

export const contactValidationRules = {
  first_name: {
    presence: {
      allowEmpty: false,
      message: 'is required',
    },
    length: {
      minimum: 4,
      maximum: 120,
      tooShort: 'can not be less than 4 characters.',
      tooLong: 'can not be more than 120 characters.',
    },
  },
  last_name: {
    presence: {
      allowEmpty: false,
      message: 'is required',
    },
    length: {
      minimum: 4,
      maximum: 120,
      tooShort: 'can not be less than 4 characters.',
      tooLong: 'can not be more than 120 characters.',
    },
  },
  phone_number: {
    presence: {
      allowEmpty: false,
      message: 'is required',
    },
    length: {
      is: 11,
      wrongLength: 'must be 11 digits',
    },
    numericality: true,
  },
  email: {
    presence: {
      allowEmpty: false,
      message: 'address is required',
    },
    email: {
      message: 'is not a valid email address',
    },
  },
};
