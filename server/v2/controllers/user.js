import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { tksecret } from '../config/config.json';
import models from '../models';
import User from './_support/user';

module.exports = {
  create(req, res) {
    req.body.phonenumber += '';
    const user = new User(req.body);

    if (!user.safe()) {
      return res.status(400).json({ error: true, message: user.getErrors() });
    }
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    return models.users
      .findOne({
        where: {
          $or: [
            { username: req.body.username },
            { phonenumber: req.body.phonenumber },
            { email: req.body.email },
          ],
        },
      })
      .then((user) => {
        if (user) {
          return res.status(400).json({ error: true, message: 'username or phonenumber or email has already been used.' });
        }
        return models.users
          .create(req.body)
          .then((user) => {
            return res.status(200).json({ created: true, message: 'Account created' });
          })
          .catch(error => res.status(500).json(error));
      })
      .catch(error => res.status(500).json(error));
  },
  login(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(401).json({ error: true, message: 'Invalid username or password' });
    }

    return models.users
      .findOne({
        where: { username: req.body.username },
      })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: true, message: 'Invalid username or password' });
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(401).json({ error: true, message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, tksecret, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
      });
  },
  getEvents(req, res) {
    return models.events.findAll({
      where: {
        userid: req.user.id,
      }
    })
    .then(events => res.status(200).json(events))
    .catch(error => res.status(500).json(error));
  },
};
