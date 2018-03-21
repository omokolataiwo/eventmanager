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
  startdate: {
    presence: {
      allowEmpty: false,
      message: 'is required.',
    },
    isValidDate: true,
    isElapsedDate: true,
  },

  enddate: {
    presence: {
      allowEmpty: false,
      message: 'is required',
    },
    isValidDate: true,
    isElapsedDate: true,
    beforeStartDate: {
      attribute: 'startdate',
    },
  },
};

class Event {
  constructor(event) {
    this.error = false;
    this.title = event.title || '';
    this.startdate = moment(event.start).format('YYYY-MM-DD') || '';
    this.enddate = moment(event.end).format('YYYY-MM-DD') || '';
    this.errorMessages = {};
  }

  load(event) {
    this.title = event.title ? event.title : this.title;
    this.startdate = event.startdate
      ? event.startdate
      : moment(this.startdate).format('YYYY-MM-DD');
    this.enddate = event.enddate ? event.enddate : moment(this.enddate).format('YYYY-MM-DD');
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
      startdate: this.startdate,
      enddate: this.enddate,
    };
  }
}

export { Event as default };

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
  let enddate = attributes[key];
  let startdate = attributes[options.attribute];

  enddate = moment(enddate, 'YYYY-MM-DD');
  startdate = moment(startdate, 'YYYY-MM-DD');

  if (!startdate.isValid() || !enddate.isValid()) {
    return null;
  }
  return enddate.diff(startdate, 'days') < 0
    ? '^Start date can not be greater than end date'
    : null;
};
