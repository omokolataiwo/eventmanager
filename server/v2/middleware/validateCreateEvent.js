import { validate } from 'validate.js';
import moment from 'moment';

export const validationRules = {
  title: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    }
  },
  startDate: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    },
    datetime: { dateOnly: true },
    isElapsedDate: true
  },

  endDate: {
    presence: {
      allowEmpty: false,
      message: 'is required'
    },
    datetime: { dateOnly: true },
    isElapsedDate: true,
    beforeStartDate: {
      attribute: 'startDate'
    }
  },
  centerId: {
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

/**
 * Extends validate to validate if a date has passed.
 *
 * @param {string} value - Date string to format
 * @returns {*} - Error message or null
 */
validate.validators.isElapsedDate = (value) => {
  const date = moment(value, 'YYYY-MM-DD');
  return date.diff(moment(), 'days') < 0 ? 'is a past date.' : null;
};

validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  /**
   * convert to date object
   *
   * @param {string} value - Date object
   * @returns {object} date object
   */
  parse(value) {
    return +moment.utc(value);
  },
  // Input is a unix timestamp
  /**
   * Format date to dateonly or date and time
   *
   * @param {string} value - Date
   * @param {object} options - Validation options
   * @returns {object} - Date object
   */
  format(value, options) {
    const format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
    return moment.utc(value).format(format);
  }
});

/**
 * Extends validate to check if a date is before another
 *
 * @param {string} value - Date string to format
 * @param {object} options - Options passed into validation rules
 * @param {string} key - Field label
 * @param {object} attributes - All validation data
 * @returns {*} - Error message or null
 */
validate.validators.beforeStartDate = (value, options, key, attributes) => {
  let endDate = attributes[key];
  let startDate = attributes[options.attribute];

  endDate = moment(endDate, 'YYYY-MM-DD');
  startDate = moment(startDate, 'YYYY-MM-DD');

  if (!startDate.isValid() || !endDate.isValid()) {
    return null;
  }
  return endDate.diff(startDate, 'days') < 0
    ? '^Start date can not be greater than end date'
    : null;
};

/**
 * Validate event's attributes
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next  - Next middleware
 * @return {*} - Server response
 */
export default (req, res, next) => {
  const errors = validate(req.body, validationRules);

  if (errors === undefined) {
    return next();
  }
  return res.status(422).json({
    status: 'error',
    errors: [errors]
  });
};
