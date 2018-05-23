/* global describe it expect */
import user from '../../client/src/reducers/user';
import * as actionTypes from '../../client/src/types';
import { userMock } from '../__mocks__/mockData';

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
  it('should return the initial state', () => {
    expect(user(undefined, {})).toEqual(defaultUser);
  });

  it('should handle FETCH_USER_REQUEST', () => {
    expect(user(defaultUser, {
      type: actionTypes.FETCH_USER_REQUEST
    })).toEqual({
      ...defaultUser,
      events: {
        ...defaultUser.events,
        fetchUser: actionTypes.FETCH_USER_REQUEST
      }
    });
  });

  it('should handle FETCH_USER_ERROR', () => {
    expect(user(defaultUser, {
      type: actionTypes.FETCH_USER_ERROR,
      errors: { auth: ['Authenticated Error'] }
    })).toEqual({
      ...defaultUser,
      errors: { auth: ['Authenticated Error'] },
      events: {
        ...defaultUser.events,
        fetchUser: actionTypes.FETCH_USER_ERROR
      }
    });
  });

  it('should handle RECEIVED_USER', () => {
    expect(user(defaultUser, {
      type: actionTypes.RECEIVED_USER,
      user: userMock
    })).toEqual({
      ...defaultUser,
      userdata: userMock,
      events: {
        ...defaultUser.events,
        fetchUser: actionTypes.RECEIVED_USER
      }
    });
  });

  it('should handle REQUEST_SIGNUP_USER', () => {
    expect(user(defaultUser, {
      type: actionTypes.REQUEST_SIGNUP_USER
    })).toEqual({
      ...defaultUser,
      events: {
        ...defaultUser.events,
        signup: actionTypes.REQUEST_SIGNUP_USER
      }
    });
  });

  it('should handle SIGNUP_USER', () => {
    expect(user(defaultUser, {
      type: actionTypes.SIGNUP_USER
    })).toEqual({
      ...defaultUser,
      events: {
        ...defaultUser.events,
        signup: actionTypes.SIGNUP_USER
      }
    });
  });

  it('should handle SIGNUP_ERROR', () => {
    expect(user(defaultUser, {
      type: actionTypes.SIGNUP_ERROR,
      errors: { phoneNumber: ['Phone number has already been taken'] }
    })).toEqual({
      ...defaultUser,
      errors: { phoneNumber: ['Phone number has already been taken'] },
      events: {
        ...defaultUser.events,
        signup: actionTypes.SIGNUP_ERROR
      }
    });
  });

  it('should handle SIGNUP_ERROR', () => {
    expect(user(defaultUser, {
      type: actionTypes.SIGNUP_ERROR,
      errors: { phoneNumber: ['Phone number has already been taken'] }
    })).toEqual({
      ...defaultUser,
      errors: { phoneNumber: ['Phone number has already been taken'] },
      events: {
        ...defaultUser.events,
        signup: actionTypes.SIGNUP_ERROR
      }
    });
  });

  it('should handle REQUEST_SIGNIN_USER', () => {
    expect(user(defaultUser, {
      type: actionTypes.REQUEST_SIGNIN_USER
    })).toEqual({
      ...defaultUser,
      events: {
        ...defaultUser.events,
        signin: actionTypes.REQUEST_SIGNIN_USER
      }
    });
  });

  it('should handle SIGNIN_USER', () => {
    expect(user(defaultUser, {
      type: actionTypes.SIGNIN_USER,
      user: {
        token: userMock.user.accessToken,
        role: userMock.user.userdata.role
      }
    })).toEqual({
      ...defaultUser,
      accessToken: userMock.user.accessToken,
      userdata: { role: userMock.user.userdata.role },
      authenticated: true,
      events: {
        ...defaultUser.events,
        signin: actionTypes.SIGNIN_USER
      }
    });
  });

  it('should handle SIGNIN_USER_ERROR', () => {
    expect(user(defaultUser, {
      type: actionTypes.SIGNIN_USER_ERROR,
      errors: { auth: ['Authenticated Error'] }
    })).toEqual({
      ...defaultUser,
      errors: { auth: ['Authenticated Error'] },
      events: {
        ...defaultUser.events,
        signin: actionTypes.SIGNIN_USER_ERROR
      }
    });
  });

  it('should handle SIGNOUT_USER', () => {
    expect(user(defaultUser, { type: actionTypes.SIGNOUT_USER })).toEqual(defaultUser);
  });

  it('should handle UPDATING_USER_REQUEST', () => {
    expect(user(defaultUser, {
      type: actionTypes.UPDATING_USER_REQUEST
    })).toEqual({
      ...defaultUser,
      events: {
        ...defaultUser.events,
        updateUser: actionTypes.UPDATING_USER_REQUEST
      }
    });
  });

  it('should handle UPDATING_USER_ERROR', () => {
    expect(user(defaultUser, {
      type: actionTypes.UPDATING_USER_ERROR,
      errors: { phoneNumber: ['Phone number has already been taken'] }
    })).toEqual({
      ...defaultUser,
      errors: { phoneNumber: ['Phone number has already been taken'] },
      events: {
        ...defaultUser.events,
        updateUser: actionTypes.UPDATING_USER_ERROR
      }
    });
  });
  it('should handle UPDATED_USER', () => {
    expect(user(defaultUser, {
      type: actionTypes.UPDATED_USER,
      user: userMock.user
    })).toEqual({
      ...defaultUser,
      userdata: userMock.user,
      events: {
        ...defaultUser.events,
        updateUser: actionTypes.UPDATED_USER
      }
    });
  });
});
