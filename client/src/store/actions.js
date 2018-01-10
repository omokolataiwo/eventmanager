import {
  REQUEST_SIGNUP_USER,
  SIGNUP_USER,
  SIGNOUT_USER,
	SIGNUP_ERROR
} from './consts';

export function requestSignupUser(user) {
  return {
    type: REQUEST_SIGNUP_USER,
  };
}

export function signupUser(user) {
  return {
    type: SIGNUP_USER,
    user,
  };
}

export function signupError(user) {
	return {
		type: SIGNUP_ERROR,
		user,
	};
}


export function signoutUser(user) {
  return {
    type: SIGNOUT_USER,
    user,
  };
}
