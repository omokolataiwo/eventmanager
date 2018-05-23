import {
  REQUEST_SIGNUP_USER,
  SIGNUP_USER,
  SIGNUP_ERROR,
  REQUEST_SIGNIN_USER,
  SIGNIN_USER,
  SIGNIN_USER_ERROR,
  SIGNOUT_USER,
  TOKEN_EXPIRED,
  UPDATING_USER_REQUEST,
  UPDATED_USER,
  UPDATING_USER_ERROR,
  FETCH_USER_REQUEST,
  RECEIVED_USER,
  FETCH_USER_ERROR,
  RESET_UPDATE_STATE
} from '../types';

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

export default (state = defaultUser, action) => {
  switch (action.type) {
  case FETCH_USER_REQUEST:
    return {
      ...state,
      errors: {},
      events: { ...state.events, fetchUser: action.type }
    };
  case FETCH_USER_ERROR:
    return {
      ...state,
      errors: action.errors,
      events: { ...state.events, fetchUser: action.type }
    };
  case RECEIVED_USER:
    return {
      ...state,
      userdata: action.user,
      events: { ...state.events, fetchUser: action.type }
    };
  case REQUEST_SIGNUP_USER:
    return { ...state, events: { ...state.events, signup: action.type } };
  case SIGNUP_USER:
    return {
      ...state,
      events: { ...state.events, signup: action.type }
    };
  case SIGNUP_ERROR:
    return {
      ...state,
      errors: action.errors,
      events: { ...state.events, signup: action.type }
    };
  case REQUEST_SIGNIN_USER:
    return { ...state, events: { ...state.events, signin: action.type } };
  case SIGNIN_USER:
    return {
      ...state,
      userdata: { role: action.user.role },
      events: { ...state.events, signin: action.type },
      accessToken: action.user.token,
      authenticated: true
    };
  case SIGNIN_USER_ERROR:
    return {
      ...state,
      errors: action.errors,
      events: { ...state.events, signin: action.type }
    };
  case SIGNOUT_USER:
    return defaultUser;
  case RESET_UPDATE_STATE:
  case UPDATING_USER_REQUEST:
    return { ...state, events: { ...state.events, updateUser: action.type } };
  case UPDATED_USER:
    return {
      ...state,
      userdata: action.user,
      events: { ...state.events, updateUser: action.type }
    };
  case UPDATING_USER_ERROR:
    return {
      ...state,
      errors: action.errors,
      events: { ...state.events, updateUser: action.type }
    };
  default:
    return state;
  }
};
