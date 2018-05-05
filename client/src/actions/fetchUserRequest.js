import axios from 'axios';
import { API_PATH } from '../consts';
import { FETCH_USER_ERROR, FETCH_USER_REQUEST, RECEIVED_USER } from '../types';

/**
 * Action to get user
 *
 * @param {object} user  Fetched user
 * @return {object}  action
 */
const receivedUser = user => ({
  type: RECEIVED_USER,
  user,
});

/**
 * Action for errors generated from backend
 *
 * @param {object} errors  Errors from backend
 * @return {object}  action
 */
const fetchUserError = errors => ({
  type: FETCH_USER_ERROR,
  errors
});

/**
 * Makes http request to backend to get user
 *
 * @returns {void}
 */
const fetchUserRequest = () => (dispatch, getState) => {
  dispatch({ type: FETCH_USER_REQUEST });
  axios.defaults.headers.common['x-access-token'] = getState().user.accessToken;

  axios
    .get(`${API_PATH}/users`)
    .then(response => {
      dispatch(receivedUser(response.data.user));
    })
    .catch(error => {
      if (!error.response || error.response.status >= 500) {
        console.error('Internal server error.');
        return;
      }
      dispatch(fetchUserError(error.response.data));
    });
};

export default fetchUserRequest;
