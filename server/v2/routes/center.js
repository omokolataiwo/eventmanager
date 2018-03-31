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
  app.post('/centers', auth, center.createCenter); // Create Center
  app.get('/centers', center.getCenters); // Get all centers
  app.get('/centers/admin', auth, center.getAdminCenters); // Get own centers
  app.get('/centers/events', auth, center.getOwnEvents); // Get own events
  app.get('/centers/contacts', auth, center.getContacts); // Get Own Center Contacts
  app.get('/centers/search', center.search);

  app.get('/centers/:id', expressJoi(idroute), center.getCenter); // Get a Single Center, does not need authentication
  app.get('/centers/:id/events', expressJoi(idroute), auth, center.getCenterWithEvents); // Get Center with events, protected
  app.put('/centers/:id', expressJoi(idroute), auth, center.editCenter); // Update a center
  app.get('/', (req, res) => res.status(200).send('Welcome to EventMan - The event manager'));
};
