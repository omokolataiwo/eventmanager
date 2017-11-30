import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { tksecret } from '../config/config.json';
import models from '../models';
import User from './_support/user';

const mUser = models.users;

module.exports = {
  create(req, res) {
    const user = new User(req.body);

    if (!user.safe()) {
      return res.status(400).json(user.getErrors());
    }

    req.body.password = bcrypt.hashSync(req.body.password, 8);
    return mUser.create(req.body)
    .then((user) => {
        res.status(200).send('Account created');
    })
    .catch((error) => res.status(400).send(error));
  },
  login(req, res) {
    
    if (!req.body.username || !req.body.password) {
      return res.status(401).send('Invalid username or password');
    }
    
    models.users.findOne({
      where: { username: req.body.username }
    }).then((user) => {
      if (!user) {
        return res.status(401).send('Invalid username or password');
      }
      
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).send('Invalid username or password');
      }

      const token = jwt.sign({ id: user.id, role: user.role }, tksecret, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token: token });
    });
  }
};
