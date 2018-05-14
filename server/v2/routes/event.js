import { event } from '../controllers';

import validateParamID from '../middleware/validateParamID';
import userAuthentication from '../middleware/userAuthentication';
import validateCreateEvent from '../middleware/validateCreateEvent';
import validateUpdateEvent from '../middleware/validateUpdateEvent';

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
    validateUpdateEvent,
    event.editEvent
  ); // Update event
  app.get(
    '/events/:id',
    validateParamID,
    userAuthentication,
    event.getEvent
  ); // Get event
  app.get('/events', userAuthentication, event.getEvents); // Get own events
};
