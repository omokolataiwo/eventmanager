import instance from '../utils/axios';
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
export const createUserRequest = user => dispatch => {
  dispatch(requestSignupUser());
  return instance
    .post(`/users`, user)
    .then(response => dispatch(signupUser(response.data)))
    .catch(error => {
      dispatch(signupError(error.response.data.errors));
    });
};

export default createUserRequest;
