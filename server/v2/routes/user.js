import jwt from 'jsonwebtoken';
import Joi from 'joi';
import expressJoi from 'express-joi-validator';
import { user } from '../controllers';
import createUserSchema from '../validate/createUserSchema';
import { tksecret } from '../config/config.json';

const auth = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ auth: false, message: 'No token provided' });
  }
  return jwt.verify(token, tksecret, (error, decoded) => {
    if (error) {
      return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    }
    if (decoded.role !== 2) {
      return res.status(401).json({ auth: false, message: 'Not authorized' });
    }
    req.user = decoded;
    return next();
  });
};

module.exports = (app) => {
  app.post('/users/login', user.login);
  app.post('/users', expressJoi(createUserSchema), user.create);
  app.get('/users/events', auth, user.getEvents);
};
