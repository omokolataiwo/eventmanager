import axios from 'axios';
import { API_PATH } from '../consts';
import {
  FETCHING_CENTER,
  RECEIVED_CENTER,
  FETCHING_CENTER_ERROR
} from '../types';
import fetchAdminCentersRequest from './fetchAdminCentersRequest';

/**
 * Action for when center is received
 *
 * @param {object} center - Center object from backend
 * @returns {object} - Action for fetching center state
 */
const recievedCenter = center => ({
  type: RECEIVED_CENTER,
  center
});

/**
 * Action pre fetching state for center
 *
 * @returns {object} - Action for fetching center state
 */
const fetchingCenter = () => ({
  type: FETCHING_CENTER
});

/**
 * Action fetching error state for center
 *
 * @param {object} errors - Server errors
 * @returns {object} - Action for fetching center state
 */
const fetchingCenterError = errors => ({
  type: FETCHING_CENTER_ERROR,
  errors
});

/**
 * Fetch user center
 *
 * @param {int} id - Center ID
 * @returns {void}
 */
const userCenter = id => dispatch => {
  axios
    .get(`${API_PATH}/centers/${id}`)
    .then(response => dispatch(recievedCenter(response.data.center)))
    .catch(error => {
      dispatch(fetchingCenterError(error.response.data));
    });
};

/**
 * Fetch admin center
 *
 * @param {*} value Query parameters
 * @return {void}
 */
const adminCenter = value => (dispatch, getState) => {
  axios.defaults.headers.common['x-access-token'] = getState().user.accessToken;
  axios
    .get(`${API_PATH}/centers/admin/center`, { params: { ...value } })
    .then(response => dispatch(recievedCenter(response.data.center)))
    .catch(error => {
      dispatch(fetchingCenterError(error.response.data));
    });
};

/**
 * Make app request and dispatch state
 *
 * @param {int} value - Center ID
 * @param {bool} admin Request admin center
 * @returns {void}
 */
const fetchCenterRequest = (value, admin) => dispatch => {
  dispatch(fetchingCenter());
  userCenter(value);
  if (admin) return dispatch(adminCenter(value));
  dispatch(userCenter(value));
};

export default fetchCenterRequest;
