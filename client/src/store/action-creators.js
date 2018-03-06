import { ACCOUNT_TYPE_GUEST } from './consts';
import * as actions from './actions';
import asyncSignupUser from './requests/signup';
import asyncSigninUser from './requests/signin';

export function signupGuestUser(user) {
  return (dispatch, getState) => {
    const state = getState();
    if (state.user.userdata.role !== ACCOUNT_TYPE_GUEST) {
      dispatch(actions.signout());
    } else {
      dispatch(asyncSignupUser(user));
    }
  };
}

export function signinUser(user) {
	return (dispatch, getState) => {
		dispatch(asyncSigninUser(user));
	}
}

export const signout = () => {
	return (dispatch, getState) => {
		dispatch(actions.signout());
	}
}
