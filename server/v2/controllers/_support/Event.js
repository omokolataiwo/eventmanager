// import validator from 'validator';
import validate from 'validate.js';
import moment from 'moment';

const CREATE_EVENT_VALIDATION_RULES = {
  title: {
    presence: {
      allowEmpty: false,
      message: 'is required.',
    },
  },
  startDate: {
    presence: {
      allowEmpty: false,
      message: 'is required.',
    },
    isValidDate: true,
    isElapsedDate: true,
  },

  endDate: {
    presence: {
      allowEmpty: false,
      message: 'is required',
    },
    isValidDate: true,
    isElapsedDate: true,
    beforeStartDate: {
      attribute: 'startDate',
    },
  },
};

class Event {
  constructor(event) {
    this.error = false;
    this.title = event.title || '';
    this.startDate = moment(event.startDate || 'InvalidDate').format('YYYY-MM-DD');
    this.endDate = moment(event.endDate || 'InvalidDate').format('YYYY-MM-DD');
    this.errorMessages = {};
  }

  load(event) {
    this.title = event.title ? event.title : this.title;
    this.startDate = event.startDate
      ? event.startDate
      : moment(this.startDate).format('YYYY-MM-DD');
    this.endDate = event.endDate ? event.endDate : moment(this.endDate).format('YYYY-MM-DD');
  }

  validate() {
    this.errorMessages = validate(this.toJSON(), CREATE_EVENT_VALIDATION_RULES);

    if (this.errorMessages) {
      this.error = true;
    }
    return this.errorMessages;
  }

  getErrors() {
    return !this.error ? {} : this.errorMessages;
  }

  safe() {
    return !this.validate();
  }

  toJSON() {
    return {
      title: this.title,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }
}

export default Event;

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

  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29;

  return day > 0 && day <= monthLength[month - 1];
};

validate.validators.isValidDate = value => (!isValidDate(value) ? 'is not a valid date' : null);
validate.validators.isElapsedDate = (value) => {
  const date = moment(value, 'YYYY-MM-DD');
  return date.diff(moment(), 'days') < 0 ? 'is a past date.' : null;
};

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
