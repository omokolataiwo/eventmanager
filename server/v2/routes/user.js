import jwt from 'jsonwebtoken';
import { validate } from 'validate.js';
import { user } from '../controllers';
import { signupRules } from '../validate/signupRules';
import { ACCOUNT_TYPE_ADMIN, ACCOUNT_TYPE_USER } from './const';

const auth = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(422).json({ auth: false, message: 'No token provided' });
  }
  return jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res
        .status(401)
        .json({ auth: false, message: 'Failed to authenticate token.' });
    }
    if (
      decoded.role !== ACCOUNT_TYPE_ADMIN &&
      decoded.role !== ACCOUNT_TYPE_USER
    ) {
      return res.status(403).json({ auth: false, message: 'Not authorized' });
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
  return res.status(422).json(errors);
};

const validateUpdate = (req, res, next) => {
  const {
    firstName,
    lastName,
    address,
    state,
    email,
    phoneNumber
  } = signupRules;
  const errors = validate(req.body, {
    firstName,
    lastName,
    address,
    state,
    email,
    phoneNumber
  });

  if (errors === undefined) {
    return next();
  }
  return res.status(422).json(errors);
};

module.exports = (app) => {
  app.post('/users/login', user.login);
  app.post('/users', validateSignup, user.create);
  app.get('/users', auth, user.getUser);
  app.put('/users/', auth, validateUpdate, user.update);
  app.post('/vtoken', auth, (req, res) =>
    res.status(200).json({ state: true })); // TODO: Remove /vtoken path. Set all token in axio.global after successful sign up
};
