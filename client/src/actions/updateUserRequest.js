import instance from '../utils/axios';
import { API_PATH } from '../consts';
import {
  UPDATING_USER_REQUEST,
  UPDATED_USER,
  UPDATING_USER_ERROR
} from '../types';

/**
 * Action creator for failing user update
 *
 * @param {object} errors Backend error messages
 * @returns {object} Action UPDATING_USER_ERROR
 */
const updatingUserError = errors => ({ type: UPDATING_USER_ERROR, errors });

/**
 * Action creator updating state with received event
 *
 * @param {object} user User data from backend
 * @returns {object} Action UPDATED_USER
 */
const updatedUser = user => ({ type: UPDATED_USER, user });

/**
 * Makes http request to backend to update user
 *
 * @param {object} user User data from form
 * @returns {void}
 */
export const updateUserRequest = user => (dispatch, getState) => {
  dispatch({ type: UPDATING_USER_REQUEST });
  instance.defaults.headers.common[
    'x-access-token'
  ] = getState().user.accessToken;
  return instance
    .put(`/users/`, user)
    .then(response => {
      dispatch(updatedUser(response.data.user));
    })
    .catch(error => {
      dispatch(updatingUserError(error.response.data));
    });
};
export default updateUserRequest;
