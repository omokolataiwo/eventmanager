'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('../../db.json');

var _db2 = _interopRequireDefault(_db);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
  function Event(event) {
    _classCallCheck(this, Event);

    this.error = false;
    this.errorMessages = {};
    this.load(event);
  }

  _createClass(Event, [{
    key: 'load',
    value: function load(event) {
      this.name = event.name || '';
      this.startDate = event.startDate || '';
      this.endDate = event.endDate || '';
      this.time = event.time || '';
      this.state = event.state || '';
      this.summary = event.summary || '';
      this.center = event.center || '';
      this.id = event.id || null;
      this.centerdb = _db2.default.centers;
    }
  }, {
    key: 'setId',
    value: function setId(id) {
      this.id = id;
    }
  }, {
    key: 'updateCenter',
    value: function updateCenter() {
      if (this.centerdb[this.center].events) {
        this.centerdb[this.center].events.push(this.id);
        return;
      }
      this.centerdb[this.center].events = [this.id];
      return;
    }
  }, {
    key: 'validate',
    value: function validate() {
      if (_validator2.default.isEmpty(this.name ? '' + this.name : '')) {
        this.errorMessages.name = 'Event name can not be empty';
        this.error = true;
      }

      if (!_validator2.default.isInt(this.state ? '' + this.state : '') || Math.floor(parseInt(this.state)) < 1 || Math.floor(parseInt(this.state)) > 37) {
        this.errorMessages.state = 'Event state must be a state code';
        this.error = true;
      }

      var center = this.centerdb;

      if (!_validator2.default.isInt(this.center ? '' + this.center : '') || !center[this.center]) {
        this.errorMessages.center = 'Event center not a valid center';
        this.error = true;
      }

      if (_validator2.default.isEmpty(this.toValidatorString(this.startDate)) || !this.isValidDate(this.endDate)) {
        this.errorMessages.startDate = 'Event must have a valid start date';
        this.error = true;
      }

      if (_validator2.default.isBefore(this.toValidatorString(this.startDate))) {
        this.errorMessages.startDate = "Event date is a passed date.";
        this.error = true;
      }

      if (_validator2.default.isEmpty(this.toValidatorString(this.endDate)) || !this.isValidDate(this.endDate)) {
        this.errorMessages.endDate = "Event must have a valid end date.";
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
      if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(dateString)) return false;

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
    key: 'safe',
    value: function safe() {
      return !this.error;
    }
  }, {
    key: 'getErrors',
    value: function getErrors() {
      if (!this.error) return {};
      return this.errorMessages;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        id: this.id,
        name: this.name,
        startDate: this.startDate,
        endDate: this.endDate,
        time: this.time,
        state: this.state,
        summary: this.summary,
        center: this.center
      };
    }
  }]);

  return Event;
}();

exports.default = Event;