import { user } from '../controllers';
import auth from '../middleware/auth';
import validateSignup from '../middleware/validateSignup';
import validateUserUpdate from '../middleware/validateUserUpdate';
import validateSignin from '../middleware/validateSignin';

module.exports = (app) => {
  app.post('/users/signin', validateSignin, user.signin);
  app.post('/users', validateSignup, user.create);
  app.get('/users', auth, user.getUser);
  app.put('/users/', auth, validateUserUpdate, user.update);
};
