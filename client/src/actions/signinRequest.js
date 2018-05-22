import instance from '../utils/axios';
import { SIGNIN_USER, REQUEST_SIGNIN_USER, SIGNIN_USER_ERROR } from '../types';

/**
 * Action for  pre-signin state
 *
 * @return {object} - action
 */
const signingInUser = () => ({ type: REQUEST_SIGNIN_USER });

/**
 * Action for sign in completed state
 *
 * @param {object} user - signed in user details
 * @return {object} - action
 */
const userSignedIn = user => ({ type: SIGNIN_USER, user });

/**
 * Action for signin error state
 *
 * @param {object} errors - error messages
 * @return {object} - action
 */
const signingInUserError = errors => ({
  type: SIGNIN_USER_ERROR,
  errors: errors
});

/**
 * Make http request to backend to sign in user
 *
 * @param {object} user - signin details
 * @returns {void}
 */
export const signinRequest = user => dispatch => {
  dispatch(signingInUser());
  return instance
    .post(`/users/signin`, user)
    .then(response => {
      dispatch(userSignedIn(response.data.user));
    })
    .catch(error => {
      dispatch(signingInUserError(error.response.data.errors));
    });
};

export default signinRequest;
