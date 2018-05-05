import axios from 'axios';
import { API_PATH } from '../consts';
import {
  FETCHING_ADMIN_CENTERS,
  RECEIVED_ADMIN_CENTERS,
  FETCHING_ADMIN_CENTERS_ERROR
} from '../types';

/**
 * Action for received admin center
 *
 * @param {object} centers - admin center(s)
 * @return {object} - Action:  RECEIVED_ADMIN_CENTERS
 */
const receivedAdminCenter = centers => ({
  type: RECEIVED_ADMIN_CENTERS,
  centers: centers.data.centers
});

/**
 * Action for getting admin center
 *
 * @return {object} - Action:  FETCHING_ADMIN_CENTERS
 */
const fetchingAdminCenters = () => ({
  type: FETCHING_ADMIN_CENTERS
});

/**
 * Action for getting admin center
 *
 * @param {object} errors - error messages
 * @return {object} - Action:  RECEIVED_ADMIN_CENTERS
 */
const fetchingAdminCentersError = errors => ({
  type: FETCHING_ADMIN_CENTERS_ERROR,
  errors
});

/**
 * Actions creator for fetching admin centers
 *
 * @returns {void}
 */
const fetchAdminCentersRequest = () => (dispatch, getState) => {
  dispatch(fetchingAdminCenters());
  axios.defaults.headers.common['x-access-token'] = getState().user.accessToken;
  axios
    .get(`${API_PATH}/centers/admin`)
    .then(response => {
      console.log('=====', response.data);
      dispatch(receivedAdminCenter(response.data));
    })
    .catch(e => {
      dispatch(fetchingAdminCentersError(e));
    });
};

export default fetchAdminCentersRequest;
