'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
  function Event(event) {
    _classCallCheck(this, Event);

    this.error = false;
    this.name = event.name || '';
    this.startdate = (0, _moment2.default)(event.startdate).format('YYYY-MM-DD') || '';
    this.enddate = (0, _moment2.default)(event.enddate).format('YYYY-MM-DD') || '';
    this.errorMessages = {};
  }

  _createClass(Event, [{
    key: 'load',
    value: function load(event) {
      this.name = event.name ? event.name : this.name;
      this.startdate = event.startdate ? event.startdate : (0, _moment2.default)(this.startdate).format('YYYY-MM-DD');
      this.enddate = event.enddate ? event.enddate : (0, _moment2.default)(this.enddate).format('YYYY-MM-DD');
    }
  }, {
    key: 'validate',
    value: function validate() {
      if (_validator2.default.isEmpty(this.toValidatorString(this.name))) {
        this.errorMessages.name = 'Event name can not be empty';
        this.error = true;
      }

      if (_validator2.default.isEmpty(this.toValidatorString(this.startdate)) || !this.isValidDate(this.startdate)) {
        this.errorMessages.startdate = 'Event must have a valid start date';
        this.error = true;
      }

      if (_validator2.default.isBefore(this.toValidatorString(this.startdate))) {
        this.errorMessages.startdate = 'Event date is a passed date.';
        this.error = true;
      }

      if (_validator2.default.isEmpty(this.toValidatorString(this.enddate)) || !this.isValidDate(this.enddate)) {
        this.errorMessages.enddate = 'Event must have a valid end date.';
        this.error = true;
      }
      var mEndDate = (0, _moment2.default)(this.enddate, 'YYYY-MM-DD');
      var mStartDate = (0, _moment2.default)(this.startdate, 'YYYY-MM-DD');

      if (mEndDate.diff(mStartDate, 'days') < 0) {
        this.errorMessages.startdate = 'Start date can not be greater than end date';
        this.error = true;
      }
    }
  }, {
    key: 'toValidatorString',
    value: function toValidatorString(field) {
      return field ? '' + field : '';
    }
  }, {
    key: 'isValidDate',
    value: function isValidDate(dateString) {
      //https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
      if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString)) {
        return false;
      }

      var parts = dateString.split("-");
      var day = parseInt(parts[2], 10);
      var month = parseInt(parts[1], 10);
      var year = parseInt(parts[0], 10);

      if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

      var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if (year % 400 == 0 || year % 100 != 0 && year % 4 == 0) monthLength[1] = 29;

      return day > 0 && day <= monthLength[month - 1];
    }
  }, {
    key: 'getErrors',
    value: function getErrors() {
      if (!this.error) return {};
      return this.errorMessages;
    }
  }, {
    key: 'datetoString',
    value: function datetoString(date) {
      return date.getYear() + '-' + date.getMonth() + '-' + date.getDay();
    }
  }, {
    key: 'safe',
    value: function safe() {
      this.validate();
      return !this.error;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        name: this.name,
        startdate: this.startdate,
        enddate: this.enddate
      };
    }
  }]);

  return Event;
}();

exports.default = Event;