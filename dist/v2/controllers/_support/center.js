'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Center = function () {
  function Center() {
    _classCallCheck(this, Center);
  }

  _createClass(Center, [{
    key: 'update',
    value: function update(res, req) {
      return this.mCenter.findOne({
        where: { id: req.params.id }
      }).then(function (center) {
        console.log(center);
        if (!center) {
          res.status(401).send({ error: true, message: 'Invalid center' });
        }
        console.log(center.get({ plain: true }));

        var existingCenter = new Center(center.toJSON());
        existingCenter.load(req.body);
        return existingCenter.save(center.id);
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: 'validate',
    value: function validate() {

      if (!_validator2.default.isInt(this.toValidatorString(this.ownerid)) && this.ownerid < 1) {
        this.errorMessages.ownerid = 'Center must have an owner';
        this.error = true;
      }
      /*
      this.userExist(this.ownerid).then((owner) => {
        return owner;
      }, function(res){
        console.log("this is result");
      });
      */

      return this.error;
    }

    /*userExist(id) {
      ;
    }*/

  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        name: this.name,
        capacity: this.capacity,
        address: this.address,
        state: this.state,
        facilities: this.facilities,
        amount: this.amount,
        ownerid: this.ownerid
      };
    }
  }], [{
    key: 'getFields',
    value: function getFields() {
      return ['name', 'capacity', 'address', 'state', 'facilities', 'amount'];
    }
  }, {
    key: 'nameValidate',
    value: function nameValidate(value, res) {
      if (_validator2.default.isEmpty(_base2.default.toValidatorString(value))) {
        res.status(400).send('Center name can not be empty.');
        return false;
      }
      return true;
    }
  }, {
    key: 'capacityValidate',
    value: function capacityValidate(value, res) {
      if (!_validator2.default.isInt(_base2.default.toValidatorString(value)) || parseInt(value) < 1) {
        res.status(400).send('Center capacity is not a number or capacity too small.');
        return false;
      }
      return true;
    }
  }, {
    key: 'addressValidate',
    value: function addressValidate(value, res) {
      if (value.trim().length === 0) {
        res.status(400).send('Center must have an address.');
        return false;
      }
      return true;
    }
  }, {
    key: 'stateValidate',
    value: function stateValidate(value, res) {
      var stateCode = Math.floor(parseInt(value));
      if (!_validator2.default.isInt(_base2.default.toValidatorString(stateCode)) || stateCode < 1 || stateCode > 37) {
        res.status(400).send('Center state must be a state code');
        return false;
      }
      return true;
    }
  }, {
    key: 'facilitiesValidate',
    value: function facilitiesValidate(value, res) {
      return true;
    }
  }, {
    key: 'amountValidate',
    value: function amountValidate(value, res) {
      if (!_validator2.default.isInt(_base2.default.toValidatorString(value)) || value < 0) {
        return res.status(400).send('Amount given must be a number');
        return false;
      }
      return true;
    }
    /**/

  }, {
    key: 'save',
    value: function save(id, res, req) {
      if (!this.safe()) {
        return false;
      }

      if (id) {
        return this.mCenter.update(req.body, {
          where: { id: req.params.id }
        });
      }

      return this.mCenter.create(this.toJSON());
    }
  }]);

  return Center;
}();

exports.default = Center;