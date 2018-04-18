import validate from 'validate.js';
import moment from 'moment';

const CREATE_EVENT_VALIDATION_RULES = {
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
    isValidDate: true,
    isElapsedDate: true
  },

  endDate: {
    presence: {
      allowEmpty: false,
      message: 'is required'
    },
    isValidDate: true,
    isElapsedDate: true,
    beforeStartDate: {
      attribute: 'startDate'
    }
  }
};

/**
 * Helper class for event
 *
 * @class Event
 */
class Event {
  /**
   * Creates an instance of Event.
   *
   * @param {any} event - Center event
   * @memberof Event
   */
  constructor(event) {
    this.error = false;
    this.title = event.title || '';
    this.startDate = moment(event.startDate || 'InvalidDate').format('YYYY-MM-DD');
    this.endDate = moment(event.endDate || 'InvalidDate').format('YYYY-MM-DD');
    this.errorMessages = {};
  }

  /**
   * Update event's properties
   *
   * @param {any} event - Center event
   * @returns {object} - This object
   * @memberof Event
   */
  load(event) {
    this.title = event.title ? event.title : this.title;
    this.startDate = event.startDate
      ? event.startDate
      : moment(event.startDate || 'InvalidDate').format('YYYY-MM-DD');
    this.endDate = event.endDate
      ? event.endDate
      : moment(event.endDate || 'InvalidDate').format('YYYY-MM-DD');

    return this;
  }

  /**
   * Validate event's attributes
   *
   * @returns {*} - Error message or null
   * @memberof Event
   */
  validate() {
    this.errorMessages = validate(this.toJSON(), CREATE_EVENT_VALIDATION_RULES);

    if (this.errorMessages) {
      this.error = true;
    }
    return this.errorMessages;
  }

  /**
   * Return generated errors
   *
   * @returns {object} - Errors
   * @memberof Event
   */
  getErrors() {
    return !this.error ? {} : this.errorMessages;
  }

  /**
   * Check if there are no errors
   *
   * @returns {bool} - true/false
   * @memberof Center
   */
  safe() {
    return !this.validate();
  }

  /**
   * Convert object to JSON-like object
   *
   * @returns {object} - JSON-like object
   * @memberof Center
   */
  toJSON() {
    return {
      title: this.title,
      startDate: this.startDate,
      endDate: this.endDate
    };
  }
}

export default Event;

/**
 * Validator for date
 * @see https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
 *
 * @param {string} dateString - date to validate
 * @returns {bool} - true/false
 */
const isValidDate = (dateString) => {
  if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString)) {
    return false;
  }
  const parts = dateString.split('-');
  const day = parseInt(parts[2], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[0], 10);

  if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLength[1] = 29;
  }

  return day > 0 && day <= monthLength[month - 1];
};

/**
 * Extends validate to validate date
 *
 * @param {string} value - Date string to format
 * @returns {*} - Error message or null
 */
validate.validators.isValidDate = value =>
  (!isValidDate(value) ? 'is not a valid date' : null);

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
