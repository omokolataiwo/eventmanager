'use strict';

var _db = require('../db.json');

var _db2 = _interopRequireDefault(_db);

var _event = require('./_support/event');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  createEvent: function createEvent(req, res) {
    var event = new _event2.default(req.body);
    var events = _db2.default.events;
    var newEventKey = _db2.default.keys.events;
    event.setId(newEventKey);

    event.validate();
    if (!event.safe()) {
      return res.status(400).json({ error: true, message: event.getErrors() });
    }
    event.updateCenter();
    events[newEventKey] = event.toJSON();
    _db2.default.keys.events += 1;
    return res.status(201).json({ error: false });
  },
  deleteEvent: function deleteEvent(req, res) {
    var id = req.params.id;
    var events = _db2.default.events;

    if (!events[id]) {
      return res.status(400).json({ error: true, message: 'Invalid event' });
    }
    var event = events[id];
    var center = _db2.default.centers[event.center];
    /*
    console.log("Events", center.events);
    console.log(center.events.indexOf(id)); */
    var index = center.events.findIndex(function (e) {
      return e == id;
    });
    center.events.splice(index, 1);
    delete events[id];

    return res.status(200).json(event);
  },
  editEvent: function editEvent(req, res) {
    var id = req.params.id;
    var events = _db2.default.events;

    if (!events[id]) {
      return res.status(400).json({ error: true, message: 'Invalid event' });
    }

    var event = new _event2.default(events[id]);
    var oldCenter = event.center;
    event.load(req.body);
    event.setId(id);
    event.validate();

    if (!event.safe()) {
      return res.status(400).json({ error: true, message: event.getErrors() });
    }

    if (oldCenter !== event.center) {
      var center = _db2.default.centers[oldCenter];
      var index = center.events.findIndex(function (e) {
        return e == id;
      });

      center.events.splice(index, 1);
      event.updateCenter();
    }

    events[id] = event.toJSON();
    return res.status(201).json({ error: false, event: event.toJSON() });
  }
};