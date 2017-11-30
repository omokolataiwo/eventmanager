import { event } from '../controllers';

const auth = function(req, res, next) {
  next();
};

module.exports = (app) => {
  app.post('/events', auth, event.createEvent);
  app.delete('/events/:id', auth, event.deleteEvent);
  app.put('/events/:id', auth, event.editEvent);
};
