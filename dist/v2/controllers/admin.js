'use strict';

var _center = require('./_support/center');

var _center2 = _interopRequireDefault(_center);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  createCenter: function createCenter(req, res) {

    var fields = _center2.default.getFields();
    var len = fields.length;
    var i = -1;

    while (i < len) {
      if (!_center2.default[fields[i] + 'Validate'](req.body[fields[i]], res)) {
        return;
      }
      i += 1;
    }

    req.body.ownerid = req.user.id;

    return _models2.default.users.findById(req.body.ownerid).then(function (user) {
      if (!user) {
        return res.status(400).send('Center must have a valid owner');
      }

      return _models2.default.centers.create(req.body).then(function (center) {
        return res.status(200).json(center);
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    });
  },
  centers: function centers(req, res) {
    return _models2.default.centers.all().then(function (centers) {
      return res.status(200).json(centers);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  center: function center(req, res) {

    if (!req.params.id || parseInt(req.params.id) != req.params.id) {
      return res.status(400).send("Invalid center");
    }

    return _models2.default.centers.findById(req.params.id).then(function (center) {
      if (!center) {
        return res.status(404).json({ message: 'Center not found' });
      }

      return res.status(200).json(center);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  editCenter: function editCenter(req, res) {
    if (!req.params.id || parseInt(req.params.id) != req.params.id) {
      return res.status(400).send("Invalid center");
    }

    _models2.default.centers.findById(req.params.id).then(function (center) {
      center = center.toJSON();

      Object.keys(center).forEach(function (field) {
        center[field] = req.body[field] ? req.body[field] : center[field];
      });

      var fields = _center2.default.getFields();
      var len = fields.length;
      var i = -1;

      while (++i < len) {
        if (!_center2.default[fields[i] + 'Validate'](center[fields[i]], res)) {
          return;
        }
      }

      return _models2.default.centers.update(center, {
        where: { id: req.params.id }
      }).then(function (center) {
        res.status(200).json(center);
      });
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  }
};