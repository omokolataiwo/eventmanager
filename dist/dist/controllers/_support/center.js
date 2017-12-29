'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Center = function () {
  function Center(center) {
    _classCallCheck(this, Center);

    this.error = false;
    this.errorMessages = {};
    this.load(center);
  }

  _createClass(Center, [{
    key: 'load',
    value: function load(center) {
      this.name = center.name || '';
      this.capacity = center.capacity || 0;
      this.category = center.category || '';
      this.address = center.address || '';
      this.area = center.area || '';
      this.state = center.state || '';
      this.facilities = center.facilities || '';
      this.amount = center.amount || '';
      this.summary = center.summary || '';
    }
  }, {
    key: 'validate',
    value: function validate() {
      if (_validator2.default.isEmpty(this.name)) {
        this.errorMessages.name = 'Center name can not be empty.';
        this.error = true;
      }
      if (!_validator2.default.isInt(this.capacity)) {
        this.errorMessages.capacity = 'Center capacity is not a number.';
        this.error = true;
      }
      if (this.address.trim().length === 0) {
        this.errorMessages.address = 'Center must have an address.';
        this.error = true;
      }
      if (!_validator2.default.isInt(this.amount)) {
        this.errorMessages.amount = 'Amount given must be a number';
        this.error = true;
      }
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
        name: this.name,
        capacity: this.capacity,
        address: this.address,
        area: this.area,
        state: this.state,
        facilities: this.facilities,
        amount: this.amount,
        summary: this.summary
      };
    }
  }]);

  return Center;
}();

exports.default = Center;