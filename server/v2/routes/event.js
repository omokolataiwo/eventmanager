import { event } from '../controllers';

module.exports = (app) => {
  app.post('/events', event.createEvent);
  app.delete('/events/:id', event.deleteEvent);
  app.put('/events/:id', event.editEvent);
};
