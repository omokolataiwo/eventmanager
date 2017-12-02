import jwt from 'jsonwebtoken';
import Joi from 'joi';
import expressJoi from 'express-joi-validator';
import { center } from '../controllers';
import { tksecret } from '../config/config.json';
import createCenterSchema from '../validate/createCenterSchema';
import getCenterSchema from '../validate/getCenterSchema';

const auth = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ auth: false, message: 'No token provided' });
  }
  return jwt.verify(token, tksecret, (error, decoded) => {
    if (error) {
      return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    }
    if (decoded.role > 1 || decoded.role < 0) {
      return res.status(401).json({ auth: false, message: 'Not authorized' });
    }
    req.user = decoded;
    return next();
  });
};

module.exports = (app) => {
  app.post('/centers', auth, expressJoi(createCenterSchema), center.createCenter);
  app.get('/centers', expressJoi(getCenterSchema), center.getCenters);
  app.get('/centers/:id', center.getCenter);
  app.put('/centers/:id', auth, center.editCenter);
  app.get('/centers/:id/events', auth, center.getEvents);
  app.get('/centers/date/:date?', center.getCenterByDate);
  app.get('/', (req, res) => res.status(200).send('Welcome to EventMan - The event manager'));
};
