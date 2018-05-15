import {
  ACCOUNT_TYPE_ADMIN,
  ACCOUNT_TYPE_USER,
  ACCOUNT_TYPE_SUPER_ADMIN
} from '../../middleware/const';

module.exports = {
  register: {
    lucy: {
      firstName: 'Lucy',
      lastName: 'Ben',
      phoneNumber: '08032108214',
      username: 'lucy',
      password: 'one_password',
      matchPassword: 'one_password',
      role: ACCOUNT_TYPE_ADMIN,
      email: 'lucy@yahoo.com'
    },
    blaze: {
      firstName: 'Blaze',
      lastName: 'Ben',
      phoneNumber: '08032108215',
      username: 'blaze',
      password: 'one_password',
      matchPassword: 'one_password',
      role: ACCOUNT_TYPE_ADMIN,
      email: 'blaze@yahoo.com'
    },
    johndoe: {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '08032108216',
      username: 'johndoe',
      password: 'one_password',
      matchPassword: 'one_password',
      role: ACCOUNT_TYPE_USER,
      email: 'johndoe@yahoo.com'
    },
    superAdmin: {
      firstName: 'Super',
      lastName: 'Admin',
      phoneNumber: '08032108217',
      username: 'super',
      password: '$2a$08$W9kjkcQcNXAKFHGMB6rnOuxXZvLbeBtl607FEtH7gVXAH/COPGQCm',
      role: ACCOUNT_TYPE_SUPER_ADMIN,
      email: 'super@yahoo.com'
    }
  },
  login: {
    lucy: {
      username: 'lucy',
      password: 'one_password'
    },
    blaze: {
      username: 'blaze',
      password: 'one_password'
    },
    johndoe: {
      username: 'johndoe',
      password: 'one_password'
    },
    superAdmin: {
      username: 'super',
      password: 'one_password'
    }
  }
};
