import {
  REQUEST_SIGNUP_USER,
  SIGNUP_USER,
  SIGNUP_ERROR,
  SIGNIN_USER,
  SIGNIN_ERROR,
  SIGNOUT_USER,
} from './consts';

export function requestSignupUser(user) {
  return {
    type: REQUEST_SIGNUP_USER,
  };
}

export function signupUser(user) {
  return {
    type: SIGNUP_USER,
    userdata: user.payload,
    events: {
      isSigningup: false,
      isSignedup: true,
    },
  };
}

export function signupError(errors) {
  return {
    type: SIGNUP_ERROR,
    errors,
  };
}
export function signinUser(user) {
  return {
    type: SIGNIN_USER,
    userdata: user.userdata,
    events: { isSignedin: true },
    token: user.token,
  };
}

export function signinError(errors) {
  return {
    type: SIGNIN_ERROR,
    events: { isSigningin: false },
    errors,
  };
}

export function signout() {
  return {
    type: SIGNOUT_USER,
  };
}
