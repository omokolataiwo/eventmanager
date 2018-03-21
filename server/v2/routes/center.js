import jwt from 'jsonwebtoken';
import Joi from 'joi';
import expressJoi from 'express-joi-validator';
import { center } from '../controllers';
import { tksecret } from '../config/config.json';
import createCenterSchema from '../validate/createCenterSchema';
import idroute from '../validate/idroute';
import { ACCOUNT_TYPE_ADMIN } from './const';

const auth = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ auth: false, message: 'No token provided' });
  }
  return jwt.verify(token, tksecret, (error, decoded) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ auth: false, type: error.name });
    }

    if (decoded.role !== ACCOUNT_TYPE_ADMIN) {
      return res.status(401).json({ auth: false, message: 'Not authorized' });
    }
    req.user = decoded;
    return next();
  });
};

module.exports = (app) => {
  app.post('/centers', auth, center.createCenter);
  app.get('/centers', center.getCenters);
  app.get('/centers/contacts', auth, center.getContacts);
  app.get('/centers/:id', expressJoi(idroute), center.getCenter);
  app.put('/centers/:id', expressJoi(idroute), auth, center.editCenter);
  app.get('/centers/:id/events', expressJoi(idroute), auth, center.getEvents);
  app.get('/', (req, res) => res.status(200).send('Welcome to EventMan - The event manager'));
};
