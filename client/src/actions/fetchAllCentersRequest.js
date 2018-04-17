import axios from 'axios';
import { API_PATH } from '../consts';
import {
  RECEIVED_CENTERS,
  FETCHING_CENTERS,
  FETCHING_CENTERS_ERROR
} from '../types';

/**
 * Action creator for received centers\
 *
 * @param {object} centers - centers from endpoint
 * @returns {object} - Action: RECEIVED_CENTERS
 */
const fetchAllCenter = centers => ({
  type: RECEIVED_CENTERS,
  centers
});

/**
 * Fetch all centers from backend
 *
 * @returns {void}
 */
const fetchAllCentersRequest = () => dispatch => {
  dispatch({
    type: FETCHING_CENTERS
  });
  axios
    .get(`${API_PATH}/centers`)
    .then(response => dispatch(fetchAllCenter(response.data)))
    .catch(e => dispatch({ type: FETCHING_CENTERS_ERROR }));
};

export default fetchAllCentersRequest;
