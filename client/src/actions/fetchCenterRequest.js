import axios from 'axios';
import { API_PATH } from '../consts';
import {
  FETCHING_CENTER,
  RECEIVED_CENTER,
  FETCHING_CENTER_ERROR,
  RESET_FETCHING_CENTER
} from '../types';

/**
 * Action for when center is received
 *
 * @param {object} center - Center object from backend
 * @returns {object} - Action for fetching center state
 */
const recievedCenter = center => ({
  type: RECEIVED_CENTER,
  center,
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
 * Make app request and dispatch state
 *
 * @param {int} id - Center ID
 * @returns {void}
 */
const fetchCenterRequest = id => dispatch => {
  dispatch(fetchingCenter());
  axios
    .get(`${API_PATH}/centers/${id}`)
    .then(response => dispatch(recievedCenter(response.data.center)))
    .catch(e => {
      dispatch(fetchingCenterError(e.response.data));
    });
};

export default fetchCenterRequest;
