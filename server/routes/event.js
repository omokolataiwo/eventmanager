import { event } from '../controllers';

module.exports = (app) => {
  app.post('/events', event.createEvent);
  app.get('/events/:id', event.deleteEvent);
  app.put('/events/:id', event.editEvent);
};
