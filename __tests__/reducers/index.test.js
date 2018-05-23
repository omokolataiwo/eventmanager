/* global describe it expect */
import index from '../../client/src/reducers/index';

const userState = {
  userdata: {
    firstName: 'Olaoluwa',
    lastName: 'Adeoye',
    role: 'ACCOUNT_TYPE_ADMIN'
  },
  errors: {},
  events: {
    signout: null,
    signup: null,
    signin: null,
    updateUser: null,
    fetchUser: null
  },
  authenticated: true,
  accessToken: 'klslk3klkl32e393ufkjd34323232e2efhiuodoijds2'
};

const defaultUser = {
  userdata: {
    role: 0
  },
  errors: {},
  events: {
    signout: null,
    signup: null,
    signin: null,
    updateUser: null,
    fetchUser: null
  },
  authenticated: false,
  accessToken: ''
};

describe('center reducer', () => {
  it('should reset state', () => {
    expect(index(userState, { type: 'SIGNOUT_USER' }).user).toEqual(defaultUser);
  });
});
