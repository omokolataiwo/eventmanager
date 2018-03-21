import jwt from 'jsonwebtoken';
import { validate } from 'validate.js';
import { user } from '../controllers';
import { signupRules } from '../validate/signupRules';
import { tksecret } from '../config/config.json';
import { ACCOUNT_TYPE_ADMIN, ACCOUNT_TYPE_USER } from './const';

const auth = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ auth: false, message: 'No token provided' });
  }
  console.log(req.headers);
  return jwt.verify(token, tksecret, (error, decoded) => {
    if (error) {
      return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    }
    if (decoded.role !== ACCOUNT_TYPE_ADMIN && decoded.role !== ACCOUNT_TYPE_USER) {
      return res.status(401).json({ auth: false, message: 'Not authorized' });
    }
    req.user = decoded;
    return next();
  });
};

const validateSignup = (req, res, next) => {
  const errors = validate(req.body, signupRules);

  if (errors === undefined) {
    return next();
  }
  return res.status(400).json(errors);
};

module.exports = (app) => {
  app.post('/users/login', user.login);
  app.post('/users', validateSignup, user.create);
  app.get('/users/events', auth, user.getEvents);
  app.post('/vtoken', auth, (req, res) => res.status(200).json({ state: true }));
};
