'use strict';

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _center = require('./_support/center');

var _center2 = _interopRequireDefault(_center);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  createCenter: function createCenter(req, res) {
    var center = new _center2.default(req.body);
    var centers = _models2.default.centers;
    var newCenterKey = _models2.default.keys.centers;

    center.validate();
    if (!center.safe()) {
      return res.json({ error: true, message: center.getErrors() });
    }
    centers[newCenterKey] = center.toJSON();
    _models2.default.keys.centers += 1;
    return res.json({ error: false });
  },
  centers: function centers(req, res) {
    return res.json(_models2.default.centers);
  },
  center: function center(req, res) {
    res.json(_models2.default.centers[req.params.id] || {});
  },
  editCenter: function editCenter(req, res) {
    var id = req.params.id;
    var centers = _models2.default.centers;

    if (!centers[id]) {
      return res.json({ error: true, message: 'Invalid center' });
    }
    var center = new _center2.default(centers[id]);
    center.load(req.body);
    center.validate();
    if (!center.safe()) {
      return res.json({ error: true, message: center.getErrors() });
    }
    centers[id] = center.toJSON();
    return res.send({ error: false });
  }
};