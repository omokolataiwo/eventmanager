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
      return res.status(400).json({ errors: user.getErrors() });
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
          return res
            .status(400)
            .json({ global: ['username or phonenumber or email has already been used.'] });
        }
        return models.users
          .create(req.body)
          .then((user) => {
            user = user.toJSON();
            delete user.password;
            return res
              .status(200)
              .json({ payload: user, success: { global: ['Account created'] } });
          })
          .catch(error => res.status(500).json(error));
      })
      .catch(error => res.status(500).json(error));
  },
  login(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(401).json({ errors: { global: ['Invalid username or password'] } });
    }

    return models.users
      .findOne({
        where: { username: req.body.username },
      })
      .then((user) => {
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(401).json({ errors: { global: ['Invalid username or password'] } });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, tksecret, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token, userdata: user });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send('Server Error');
      });
  },
  getUser(req, res) {
    return models.users
      .findOne({ where: { id: req.user.id } })
      .then(user => res.status(200).json(user))
      .catch(e => res.status(501).json({ message: 'Internal Server Error' }));
  },
  update(req, res) {
    return models.users.findOne({ where: { id: req.user.id } }).then((user) => {
      let userModel = new User(user);
      userModel.load(req.body);

      userModel = userModel.toJSON();
      return models.users
        .findOne({
          where: { $or: [{ phonenumber: userModel.phonenumber }, { email: userModel.email }] },
        })
        .then((user) => {
          if (user && user.username != userModel.username) {
            return res.status(400).json({
              message: 'Phone Number or Email Address has already been used by another user.',
            });
          }
          return models.users
            .update(userModel, { where: { id: req.user.id } })
            .then(user => res.status(200).json(user))
            .catch(e => res.status(501).json({ errorMessage: 'Internal Server Error' }));
        });
    });
  },
};
