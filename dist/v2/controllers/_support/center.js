'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _validate2 = require('validate.js');

var _validate3 = _interopRequireDefault(_validate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Center = function () {
  function Center(center) {
    _classCallCheck(this, Center);

    this.error = false;
    this.errorMessages = {};
    this.name = center.name;
    this.address = center.address;
    this.state = center.state;
    this.capacity = parseInt(center.capacity);
    this.ownerid = center.ownerid;
    this.facilities = center.facilities || 'No facilities';
    this.amount = parseInt(center.amount);
  }

  _createClass(Center, [{
    key: 'load',
    value: function load(center) {
      this.name = center.name || this.name;
      this.address = center.address || this.address;
      this.state = center.state || this.state;
      this.capacity = parseInt(center.capacity) || this.capacity;
      this.ownerid = center.ownerid || this.ownerid;
      this.facilities = center.facilities || this.facilities;
      this.amount = parseInt(center.amount) || this.amount;
    }
  }, {
    key: 'validate',
    value: function validate() {
      var stateCode = Math.floor(parseInt(this.state));
      if (stateCode < 1 || stateCode > 37) {
        this.errorMessages.state = 'state must be a valid state code';
        this.error = true;
      }

      var invalidName = _validate3.default.single(this.name, { presence: true, length: { minimum: 5, message: 'must be more than 4 characters.' } });
      if (invalidName) {
        this.errorMessages.name = invalidName[0];
        this.error = true;
      }

      if (!_validate3.default.isInteger(this.amount) || this.amount < 0 || this.amount > 2000000000) {
        this.errorMessages.amount = 'Amount is not a valid value';
        this.error = true;
      }

      if (!_validate3.default.isInteger(this.capacity) || this.capacity < 1 || this.capacity > 2000000000) {
        this.errorMessages.amount = 'Capacity is not a valid value';
        this.error = true;
      }

      var invalidAddress = _validate3.default.single(this.address, { presence: true, length: { minimum: 5, message: 'must be more than 4 characters.' } });
      if (invalidAddress) {
        this.errorMessages.address = invalidAddress;
        this.error = true;
      }
    }
  }, {
    key: 'getErrors',
    value: function getErrors() {
      if (!this.error) return {};
      return this.errorMessages;
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
        address: this.address,
        state: this.state,
        capacity: this.capacity,
        facilites: this.facilities,
        amount: this.amount
      };
    }
  }]);

  return Center;
}();

exports.default = Center;