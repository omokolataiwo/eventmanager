import database from '../db.json';
import Event from './_support/event';

module.exports = {
  createEvent(req, res) {
    const event = new Event(req.body);
    let events = database.events;
    const newEventKey = database.keys.events;
    event.setId(newEventKey);

    event.validate();
    if (!event.safe()) {
      return res.status(400).json({ error: true, message: event.getErrors() });
    }
    event.updateCenter();
    events[newEventKey] = event.toJSON();
    database.keys.events += 1;
    return res.status(201).json({ error: false });
  },
  deleteEvent(req, res) {
    const id = req.params.id;
    let events = database.events;

    if (!events[id]) {
      return res.status(400).json({ error: true, message: 'Invalid event' });
    }
    const event = events[id];
    let center = database.centers[event.center];
    /*
    console.log("Events", center.events);
    console.log(center.events.indexOf(id)); */
    const index = center.events.findIndex(function(e) {
      return e == id;
    });
    center.events.splice(index, 1);
    delete events[id];

    return res.status(200).json(event);
  },
  editEvent(req, res) {
    const id = req.params.id;
    let events = database.events;

    if (!events[id]) {
      return res.status(400).json({ error: true, message: 'Invalid event' });
    }

    const event = new Event(events[id]);
    const oldCenter = event.center;
    event.load(req.body);
    event.validate();

    if (!event.safe()) {
      return res.status(400).json({ error: true, message: event.getErrors() });
    }

    if (oldCenter !== event.center) {
      let center = database.centers[event.oldCenter];
      const index = center.events.findIndex(function(e) {
      return e == id;
    });
    
    center.events.splice(index, 1);
    event.updateCenter();
    }

    events[id] = event.toJSON();
    return res.status(201).json({ error: false });
  },
};
