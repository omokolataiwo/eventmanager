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

var User = function () {
  function User(user) {
    _classCallCheck(this, User);

    this.error = false;
    this.errorMessages = {};

    this.firstname = user.firstname || '';
    this.lastname = user.lastname || '';
    this.address = user.address || '';
    this.state = user.state || '';
    this.phonenumber = user.phonenumber || '';
    this.email = user.email || '';
    this.username = user.username || '';
    this.password = user.password || '';
    this.role = user.role || '';
  }

  _createClass(User, [{
    key: 'validate',
    value: function validate() {
      if (_validator2.default.isEmpty(this.toValidatorString(this.firstname))) {
        this.errorMessages.firstname = 'first name can not be empty';
        this.error = true;
      }

      if (_validator2.default.isEmpty(this.toValidatorString(this.lastname))) {
        this.errorMessages.lastname = 'last name can not be empty';
        this.error = true;
      }

      if (_validator2.default.isEmpty(this.toValidatorString(this.address)) || this.address.length < 5 || this.address.length > 100) {
        this.errorMessages.address = 'address can not be empty or too long';
        this.error = true;
      }

      if (_validator2.default.isEmpty(this.toValidatorString(this.username)) || this.username.length < 2 || this.username.length > 100) {
        this.errorMessages.username = 'username must be provided or too short';
        this.error = true;
      }

      if (_validator2.default.isEmpty(this.toValidatorString(this.password)) || this.password.length < 2 || this.password.length > 100) {
        this.errorMessages.password = 'password must be provided or too short';
        this.error = true;
      }

      var stateCode = Math.floor(parseInt(this.state));
      if (!_validator2.default.isInt(this.toValidatorString(stateCode)) || stateCode < 1 || stateCode > 37) {
        this.errorMessages.state = 'state must be a valid state code';
        this.error = true;
      }

      if (_validator2.default.isEmpty(this.toValidatorString(this.role)) || this.role < 1 || this.role > 2) {
        this.errorMessages.role = 'invalid role';
        this.error = true;
      }

      if (!_validator2.default.isInt(this.toValidatorString(this.phonenumber))) {
        this.errorMessages.phonenumber = 'phone number is not a number.';
        this.error = true;
      }

      if (!_validator2.default.isEmail(this.toValidatorString(this.email))) {
        this.errorMessages.email = 'invalid email format';
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

  return User;
}();

exports.default = User;