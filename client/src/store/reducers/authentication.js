import {
  REQUEST_SIGNUP_USER,
  SIGNUP_USER,
  SIGNUP_ERROR,
  ACCOUNT_TYPE_GUEST,
  REQUEST_SIGNIN_USER,
  SIGNIN_USER,
  SIGNIN_ERROR,
  SIGNOUT_USER,
} from './../consts';

import { TOKEN_EXPIRED } from './../actions/types';

const defaultUser = {
  userdata: {
    role: ACCOUNT_TYPE_GUEST,
  },
  errors: {},
  events: {
    isSigningout: false,
    isSignedout: false,
    isSigningup: false,
    isSignedup: false,
    isSigningin: false,
    isSignedin: false,
  },
  authenticated: false,
  accessToken: '',
};

export default (state = defaultUser, action) => {
  switch (action.type) {
    case REQUEST_SIGNUP_USER:
      return Object.assign({}, state, {
        ...state,
        events: { ...state.events, isSigningup: true },
      });
    case SIGNUP_USER:
      return Object.assign({}, state, {
        userdata: action.userdata,
        events: {
          ...defaultUser.events,
          ...action.events,
        },
      });
    case REQUEST_SIGNIN_USER:
      return Object.assign({}, state, {
        events: action.events,
      });
    case SIGNIN_USER:
      return Object.assign({}, state, {
        userdata: action.userdata,
        events: action.events,
        accessToken: action.token,
        authenticated: true,
      });
    case SIGNIN_ERROR:
      return Object.assign({}, state, {
        errors: action.errors,
        events: action.events,
      });
    case SIGNOUT_USER:
      return defaultUser;
    case SIGNUP_ERROR:
      return Object.assign({}, state, {
        ...state,
        errors: action.errors,
        events: { ...state.events, isSigningup: false },
      });
    case TOKEN_EXPIRED:
      return defaultUser;
    default:
      return state;
  }
};
