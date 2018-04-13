import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { tksecret } from '../config/config.json';
import models from '../models';
import User from './_support/User';

module.exports = {
  async create(req, res) {
    try {
      const user = new User(req.body);
      if (!user.safe()) {
        return res.status(422).json({ errors: user.getErrors() });
      }
      req.body.password = bcrypt.hashSync(req.body.password, 8);
      let userExist = await models.users.findOne({ where: { username: req.body.username } });

      if (userExist) {
        return res.status(422).json({ username: ['username has already been taken.'] });
      }

      userExist = await models.users.findOne({ where: { email: req.body.email } });
      if (userExist) {
        return res.status(422).json({ email: ['email has already been used.'] });
      }

      userExist = await models.users.findOne({ where: { phoneNumber: req.body.phoneNumber } });
      if (userExist) {
        return res.status(422).json({ phoneNumber: ['phone number has already been used.'] });
      }

      return models.users.create(req.body).then((newUser) => {
        const userJSON = newUser.toJSON();
        delete userJSON.password;
        return res.status(200).json(userJSON);
      });
    } catch (e) {
      return res.status(500).send('Internal Server Error.');
    }
  },
  async login(req, res) {
    try {
      const user = await models.users.findOne({ where: { username: req.body.username } });

      if (
        !req.body.username ||
        !req.body.password ||
        !user ||
        !bcrypt.compareSync(req.body.password, user.password)
      ) {
        return res.status(401).json({ errors: { global: ['Invalid username or password'] } });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, tksecret, { expiresIn: 86400 });
<<<<<<< HEAD
      return res.status(200).send({ auth: true, token, userdata: user });
=======
      res.status(200).send({ auth: true, token, userdata: user });
>>>>>>> 69999044b68f9938fe1cba7c3f09ec2cacbaed78
    } catch (e) {
      return res.status(500).send('Internal Server Error');
    }
  },
  getUser(req, res) {
    return models.users
      .findOne({ where: { id: req.user.id } })
      .then(user => res.status(200).json(user))
      .catch(() => res.status(500).json('Internal Server Error'));
  },
  async update(req, res) {
    try {
      const user = await models.users.findOne({ where: { id: req.user.id } });
      const userModel = new User(user).load(req.body).toJSON();

      const phoneNumberExist = await models.users.findOne({
        where: { phoneNumber: userModel.phoneNumber },
      });

<<<<<<< HEAD
      if (phoneNumberExist && phoneNumberExist.username !== userModel.username) {
=======
      if (phoneNumberExist && phoneNumberExist.username != userModel.username) {
>>>>>>> 69999044b68f9938fe1cba7c3f09ec2cacbaed78
        return res.status(422).json({ phoneNumber: 'Phone number has already been used.' });
      }

      const emailAddressExist = await models.users.findOne({ where: { email: userModel.email } });

<<<<<<< HEAD
      if (emailAddressExist && emailAddressExist.username !== userModel.username) {
=======
      if (emailAddressExist && emailAddressExist.username != userModel.username) {
>>>>>>> 69999044b68f9938fe1cba7c3f09ec2cacbaed78
        return res.status(422).json({ email: 'Email address has already been used.' });
      }
      return models.users
        .update(userModel, { where: { id: req.user.id } })
<<<<<<< HEAD
        .then(() => res.status(200).json(userModel));
    } catch (e) {
      return res.status(500).send('Internal Server Error');
=======
        .then(user => res.status(200).json(userModel));
    } catch (e) {
      res.status(500).send('Internal Server Error');
>>>>>>> 69999044b68f9938fe1cba7c3f09ec2cacbaed78
    }
  },
};
