import { user } from '../controllers';

module.exports = (app) => {
  app.post('/users/login', user.login);
  app.post('/users', user.create);
};
