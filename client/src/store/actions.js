import axios from 'axios';
import {
  REQUEST_SIGNUP_USER,
  SIGNUP_USER,
  API_PATH,
  ACCOUNT_TYPE_GUEST,
  SIGNOUT_USER,
} from './consts';

function requestSignupUser(user) {
  return {
    type: REQUEST_SIGNUP_USER,
    user,
  };
}

function signupUser(user) {
  return {
    type: SIGNUP_USER,
    user,
  };
}

function asynSignupUser(user) {
  return (dispatch) => {
    dispatch(requestSignupUser(user));
    return axios
      .post(`${API_PATH}/user`, user)
      .then(response => response.data)
      .then(userData => dispatch(signupUser(userData)));
  };
}

export function signoutUser(user) {
  return {
    type: SIGNOUT_USER,
    user,
  };
}

export function SignupGuestUser(user) {
  return (dispatch, getState) => {
    const state = getState();
    if (state.user.accountType !== ACCOUNT_TYPE_GUEST) {
      dispatch(signoutUser(state.user));
    } else {
      dispatch(asynSignupUser(user));
    }
  };
}
