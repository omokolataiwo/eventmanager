import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import models from '../models';

/**
 * UserController
 *
 * @export
 * @class UserController
 */
export default class UserController {
  /**
   * Create new user
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @return {*} - Server response
   */
  static async create(req, res) {
    try {
      const user = req.body;
      user.password = bcrypt.hashSync(user.password, 8);

      const errors = {};

      if (
        await models.users.findOne({
          where: { username: user.username }
        })
      ) {
        errors.username = ['username has already been taken.'];
      }

      if (
        await models.users.findOne({
          where: { email: user.email }
        })
      ) {
        errors.email = ['email has already been used.'];
      }

      if (
        await models.users.findOne({
          where: { phoneNumber: user.phoneNumber }
        })
      ) {
        errors.phoneNumber = ['phone number has already been used.'];
      }

      if (Object.keys(errors).length) {
        return res.status(422).send({ status: 'error', errors: { ...errors } });
      }

      return models.users.create(user).then((newUser) => {
        const userJSON = newUser.toJSON();
        Reflect.deleteProperty(userJSON, 'password');
        return res.status(201).json({ user: userJSON });
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        message: 'Internal Server Error'
      });
    }
  }
  /**
   * Sign in user
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @return {*} - Server response
   */
  static async signin(req, res) {
    try {
      const user = await models.users.findOne({
        where: { username: req.body.username }
      });

      if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({
          status: 'error',
          errors: [{ signin: ['Invalid username or password'] }]
        });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.TOKEN_SECRET,
        {
          expiresIn: 864000
        }
      );
      return res.status(200).send({
        user: {
          token,
          role: user.role
        }
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        message: 'Internal Server Error'
      });
    }
  }

  /**
   * Get authenticated user data
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @return {*} - Server response
   */
  static getUser(req, res) {
    return models.users
      .findOne({ where: { id: req.user.id } })
      .then(user => res.status(200).json({ user }))
      .catch(() => {
        res.status(500).send({
          status: 'error',
          message: 'Internal Server Error'
        });
      });
  }

  /**
   * Update authenticated user
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @return {*} - Server response
   */
  static async update(req, res) {
    try {
      let user = await models.users.findOne({ where: { id: req.user.id } });

      if (!user) {
        return res.status(404).json({
          status: 'error',
          errors: [{ user: ['User does not exist.'] }]
        });
      }

      user = { ...user.toJSON(), ...req.body };

      const phoneNumberExist = await models.users.findOne({
        where: { phoneNumber: user.phoneNumber }
      });

      if (phoneNumberExist && phoneNumberExist.username !== user.username) {
        return res.status(422).json({
          status: 'error',
          errors: [
            {
              phoneNumber: ['Phone number has already been used.']
            }
          ]
        });
      }

      const emailAddressExist = await models.users.findOne({
        where: { email: user.email }
      });

      if (emailAddressExist && emailAddressExist.username !== user.username) {
        return res.status(422).json({
          status: 'error',
          errors: [{ email: ['Email address has already been used.'] }]
        });
      }
      return models.users
        .update(user, { where: { id: req.user.id } })
        .then(() => {
          Reflect.deleteProperty(user, 'password');
          res.status(200).json({ user });
        });
    } catch (e) {
      return res.status(500).send({
        status: 'error',
        message: 'Internal Server Error'
      });
    }
  }
}
