import Joi from 'joi';
import expressJoi from 'express-joi-validator';
import { user } from '../controllers';
import createUserSchema from '../validate/createUserSchema';

module.exports = (app) => {
  app.post('/users/login', user.login);
  app.post('/users', expressJoi(createUserSchema), user.create);
};
