'use strict';

var _db = require('../db.json');

var _db2 = _interopRequireDefault(_db);

var _center = require('./_support/center');

var _center2 = _interopRequireDefault(_center);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  createCenter: function createCenter(req, res) {
    var center = new _center2.default(req.body);
    var centers = _db2.default.centers;
    var newCenterKey = _db2.default.keys.centers;
    center.setId(newCenterKey);

    center.validate();
    if (!center.safe()) {
      return res.status(406).json({ error: true, message: center.getErrors() });
    }
    centers[newCenterKey] = center.toJSON();
    _db2.default.keys.centers += 1;
    return res.status(200).json({ error: false, "center": center.toJSON() });
  },
  centers: function centers(req, res) {
    return res.status(200).json(_db2.default.centers);
  },
  center: function center(req, res) {
    res.status(200).json(_db2.default.centers[req.params.id] || {});
  },
  editCenter: function editCenter(req, res) {
    var id = req.params.id;
    var centers = _db2.default.centers;

    if (!centers[id]) {
      return res.status(400).json({ error: true, message: 'Invalid center' });
    }
    var center = new _center2.default(centers[id]);
    center.load(req.body);
    center.setId(id);

    center.validate();
    if (!center.safe()) {
      return res.status(406).json({ error: true, message: center.getErrors() });
    }
    centers[id] = center.toJSON();
    return res.status(201).send({ error: false, center: center.toJSON() });
  }
};