import axios from 'axios';
import { API_PATH } from '../consts';
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
 * @param {object} error - error message
 * @return {object} - action
 */
const signingInUserError = error => ({ type: SIGNIN_USER_ERROR, error });

/**
 * Make http request to backend to sign in user
 *
 * @param {object} user - signin details
 * @returns {void}
 */
const signinRequest = user => dispatch => {
  dispatch(signingInUser());

  axios
    .post(`${API_PATH}/users/login`, user)
    .then(response => {
      dispatch(userSignedIn(response.data));
    })
    .catch(e => {
      if (!e.response || e.response.status >= 500) {
        console.error('Internal server error.');
        return;
      }
      dispatch(signingInUserError(e.response.data.errors));
    });
};

export default signinRequest;
