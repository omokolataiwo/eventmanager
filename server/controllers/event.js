import database from '../models';
import Event from './_support/event';

module.exports = {
  createEvent(req, res) {
    const event = new Event(req.body);
    let events = database.events;
    const newEventKey = database.keys.events;

    event.validate();
    if (!event.safe()) {
      return res.json({ error: true, message: event.getErrors() });
    }
    events[newEventKey] = event.toJSON();
    database.keys.events += 1;
    return res.json({ error: false });
  },
  deleteEvent(req, res) {
    const id = req.params.id;
    let events = database.events;

    if (!events[id]) {
      return res.json({ error: true, message: 'Invalid event' });
    }
    const event = events[id];
    delete events[id];
    return res.json(event);
  },
  editEvent(req, res) {
    
  },
};
