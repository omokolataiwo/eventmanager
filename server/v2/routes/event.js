import { event } from '../controllers';

import validateParamID from '../middleware/validateParamID';
import userAuthentication from '../middleware/userAuthentication';
import validateCreateEvent from '../middleware/validateCreateEvent';

module.exports = (app) => {
  app.post(
    '/events',
    userAuthentication,
    validateCreateEvent,
    event.createEvent
  ); // Create event
  app.delete(
    '/events/:id',
    validateParamID,
    userAuthentication,
    event.deleteEvent
  ); // Delete event
  app.put(
    '/events/:id',
    validateParamID,
    userAuthentication,
    validateCreateEvent,
    event.editEvent
  ); // Update event
  app.get('/events', userAuthentication, event.getEvents); // Get own events
};
