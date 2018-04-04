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

import { TOKEN_EXPIRED, UPDATING_USER, UPDATED_USER } from './../actions/types';

const defaultUser = {
  userdata: {
    role: ACCOUNT_TYPE_GUEST,
  },
  errors: {},
  events: {
    signout: null,
    signup: null,
    signin: null,
    updateUser: null,
  },
  authenticated: false,
  accessToken: '',
};

export default (state = defaultUser, action) => {
  switch (action.type) {
    case REQUEST_SIGNUP_USER:
      return { ...state, events: { ...state.events, signup: action.type } };
    case SIGNUP_USER:
      return {
        ...state,
        userdata: action.userdata,
        events: { ...state.events, signup: action.type },
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        errors: action.errors,
        events: { ...state.events, signup: action.type},
      };
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
    case UPDATING_USER:
      return { ...state, events: { ...state.events, updateUser: state.type } };
    case UPDATED_USER:
      return {
        ...state,
        userdata: state.user,
        events: { ...state.events, updateUser: state.type },
      };
    case TOKEN_EXPIRED:
      return defaultUser;
    default:
      return state;
  }
};
