import instance from '../utils/axios';
import { FETCH_USER_ERROR, FETCH_USER_REQUEST, RECEIVED_USER } from '../types';

/**
 * Action to get user
 *
 * @param {object} user  Fetched user
 * @return {object}  action
 */
const receivedUser = user => ({
  type: RECEIVED_USER,
  user
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
export const fetchUserRequest = () => (dispatch, getState) => {
  dispatch({ type: FETCH_USER_REQUEST });
  instance.defaults.headers.common[
    'x-access-token'
  ] = getState().user.accessToken;

  return instance
    .get(`/users`)
    .then(response => {
      dispatch(receivedUser(response.data.user));
    })
    .catch(error => {
      dispatch(fetchUserError(error.response.data.errors));
    });
};

export default fetchUserRequest;
