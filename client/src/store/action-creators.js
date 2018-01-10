import { ACCOUNT_TYPE_GUEST } from './consts';
import * as actions from './actions';
import asyncSignupUser from './requests/signup';

export function signupGuestUser(user) {
  return (dispatch, getState) => {
    const state = getState();
    if (state.user.accountType !== ACCOUNT_TYPE_GUEST) {
      dispatch(actions.signoutUser(state.user));
    } else {
      dispatch(asyncSignupUser(user));
    }
  };
}
