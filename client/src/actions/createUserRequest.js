import axios from 'axios';
import { API_PATH } from '../consts';
import { REQUEST_SIGNUP_USER, SIGNUP_USER, SIGNUP_ERROR } from '../types';

/**
 * Action for pre-signup state
 *
 * @return {object} - action
 */
const requestSignupUser = () => ({
  type: REQUEST_SIGNUP_USER
});

/**
 * Action for sign up completed state
 *
 * @param {object} user - signed up user details
 * @return {object} - action
 */
const signupUser = user => ({
  type: SIGNUP_USER,
  userdata: user
});

/**
 * Action for signin error state
 *
 * @param {object} errors - error message
 * @return {object} - action
 */
const signupError = errors => ({
  type: SIGNUP_ERROR,
  errors
});

/**
 * Make http request to backend to sign up user
 *
 * @param {object} user - signup details
 * @returns {void}
 */
const createUserRequest = user => dispatch => {
  dispatch(requestSignupUser());
  return axios
    .post(`${API_PATH}/users`, user)
    .then(response => {
      dispatch(signupUser(response.data));
    })
    .catch(e => {
      if (!e.response || e.response.status >= 500) {
        console.error('Internal server error.');
        return;
      }
      dispatch(signupError(e.response.data));
    });
};

export default createUserRequest;
