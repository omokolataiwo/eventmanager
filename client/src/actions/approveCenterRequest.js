import axios from 'axios';
import { API_PATH } from '../consts';

import {
  UPDATED_CENTER,
  UPDATING_CENTER,
  UPDATING_CENTER_ERROR
} from '../types';


/**
 * Action for updating center
 *
 * @param {object} center - created center details
 * @return {object} - action [UPDATED_CENTER]
 */
const updatedCenter = center => ({ type: UPDATED_CENTER, center });

/**
 * create center error state
 *
 * @param {object} errors Center creation error
 * @return {object}  action [UPDATING_CENTER_ERROR]
 */
const updatingCenterError = errors => ({
  type: UPDATING_CENTER_ERROR,
  errors
});

/**
 * Make http request to backend to create center
 *
 * @param {string} centerId - center ID
 * @returns {void}
 */
const approveCenterRequest = (centerId) => (dispatch, getState) => {
  dispatch({ type: UPDATING_CENTER });
  axios.defaults.headers.common['x-access-token'] = getState().user.accessToken;
  axios
    .put(`${API_PATH}/centers/approve/${centerId}`)
    .then(response => {
      dispatch(updatedCenter(response.data));
    })
    .catch((error) => {
      if (!error.response || error.response.status >= 500) {
        console.error('Internal server error.');
        return;
      }
      dispatch(updatingCenterError(error.response.data));
    });
};

export default approveCenterRequest;
