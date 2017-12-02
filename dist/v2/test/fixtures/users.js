'use strict';

module.exports = {
  register: {
    validAdminUser: {
      firstname: 'Mark',
      lastname: 'Ben',
      address: '9 Cole Road',
      state: 8,
      phonenumber: 12345678901,
      username: 'benmark',
      password: 'klsldskds',
      repassword: 'klsldskds',
      role: 2,
      email: 'benmark@yahoo.com'
    },
    invalidPasswordCombination: {
      firstname: 'Mark',
      lastname: 'Ben',
      address: '9 Cole Road',
      state: 8,
      phonenumber: 12345678901,
      username: 'benmark',
      password: 'klsldskds',
      repassword: 'klsldss',
      role: 2,
      email: 'benmark@yahoo.com'
    }
  },
  login: {
    WrongPassword: {
      username: 'benmark',
      password: 'klsdsdsfaafsfsssfldskds'
    },
    NOUsername: {
      username: null,
      password: 'klsldskds'
    },
    NOPassword: {
      username: 'benmark'
    },
    validAdminUser: {
      username: 'benmark',
      password: 'klsldskds'
    }
  }
};