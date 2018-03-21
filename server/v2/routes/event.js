import jwt from 'jsonwebtoken';
import Joi from 'joi';
import expressJoi from 'express-joi-validator';
import { event } from '../controllers';
import { tksecret } from '../config/config.json';
import idroute from '../validate/idroute';
import { ACCOUNT_TYPE_USER } from './const';

const auth = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ auth: false, message: 'No token provided' });
  }
  return jwt.verify(token, tksecret, (error, decoded) => {
    if (error) {
      return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    }
    if (decoded.role !== ACCOUNT_TYPE_USER) {
      return res.status(401).json({ auth: false, message: 'Not authorized' });
    }
    req.user = decoded;
    return next();
  });
};

module.exports = (app) => {
  app.post('/events', auth, event.createEvent);
  app.delete('/events/:id', expressJoi(idroute), auth, event.deleteEvent);
  app.put('/events/:id', expressJoi(idroute), auth, event.editEvent);
  app.get('/events', auth, event.getEvents);
};
