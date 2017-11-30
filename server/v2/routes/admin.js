import jwt from 'jsonwebtoken';
import { admin } from '../controllers';
import { tksecret } from '../config/config.json';

const auth = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided' });
  }

  return jwt.verify(token, tksecret, (error, decoded) => {
    if (error) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });
    }
    if (decoded.role > 1 || decoded.role < 0) {
      return res.status(401).send('Not authorized');
    }

    req.user = decoded;
    return next();
  });
};

module.exports = (app) => {
  app.post('/centers', auth, admin.createCenter);
  app.get('/centers', admin.centers);
  app.get('/centers/:id', admin.center);
  app.put('/centers/:id', auth, admin.editCenter);
  app.get('/', (req, res) => res.status(200).send('Welcome to EventMan - The event manager'));
};
