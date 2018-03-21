'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import validator from 'validator';


var _validate2 = require('validate.js');

var _validate3 = _interopRequireDefault(_validate2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CREATE_EVENT_VALIDATION_RULES = {
  title: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    }
  },
  startdate: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    },
    isValidDate: true,
    isElapsedDate: true
  },

  enddate: {
    presence: {
      allowEmpty: false,
      message: 'is required'
    },
    isValidDate: true,
    isElapsedDate: true,
    beforeStartDate: {
      attribute: 'startdate'
    }
  }
};

var Event = function () {
  function Event(event) {
    _classCallCheck(this, Event);

    this.error = false;
    this.title = event.title || '';
    this.startdate = (0, _moment2.default)(event.start).format('YYYY-MM-DD') || '';
    this.enddate = (0, _moment2.default)(event.end).format('YYYY-MM-DD') || '';
    this.errorMessages = {};
  }

  _createClass(Event, [{
    key: 'load',
    value: function load(event) {
      this.title = event.title ? event.title : this.title;
      this.startdate = event.startdate ? event.startdate : (0, _moment2.default)(this.startdate).format('YYYY-MM-DD');
      this.enddate = event.enddate ? event.enddate : (0, _moment2.default)(this.enddate).format('YYYY-MM-DD');
    }
  }, {
    key: 'validate',
    value: function validate() {
      this.errorMessages = (0, _validate3.default)(this.toJSON(), CREATE_EVENT_VALIDATION_RULES);

      if (this.errorMessages) {
        this.error = true;
      }
      return this.errorMessages;
    }
  }, {
    key: 'getErrors',
    value: function getErrors() {
      return !this.error ? {} : this.errorMessages;
    }
  }, {
    key: 'safe',
    value: function safe() {
      return !this.validate();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        title: this.title,
        startdate: this.startdate,
        enddate: this.enddate
      };
    }
  }]);

  return Event;
}();

exports.default = Event;


var isValidDate = function isValidDate(dateString) {
  if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString)) {
    return false;
  }
  var parts = dateString.split('-');
  var day = parseInt(parts[2], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[0], 10);

  if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 400 === 0 || year % 100 !== 0 && year % 4 === 0) monthLength[1] = 29;

  return day > 0 && day <= monthLength[month - 1];
};

_validate3.default.validators.isValidDate = function (value) {
  return !isValidDate(value) ? 'is not a valid date' : null;
};
_validate3.default.validators.isElapsedDate = function (value) {
  var date = (0, _moment2.default)(value, 'YYYY-MM-DD');
  return date.diff((0, _moment2.default)(), 'days') < 0 ? 'is a past date.' : null;
};

_validate3.default.validators.beforeStartDate = function (value, options, key, attributes) {
  var enddate = attributes[key];
  var startdate = attributes[options.attribute];

  enddate = (0, _moment2.default)(enddate, 'YYYY-MM-DD');
  startdate = (0, _moment2.default)(startdate, 'YYYY-MM-DD');

  if (!startdate.isValid() || !enddate.isValid()) {
    return null;
  }
  return enddate.diff(startdate, 'days') < 0 ? '^Start date can not be greater than end date' : null;
};