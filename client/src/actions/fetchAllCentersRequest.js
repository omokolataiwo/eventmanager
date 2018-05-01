import axios from 'axios';
import { API_PATH } from '../consts';
import {
  RECEIVED_CENTERS,
  FETCHING_CENTERS,
  FETCHING_CENTERS_ERROR
} from '../types';

/**
 * Action creator for received centers
 *
 * @param {object} centersResponse - centers from endpoint
 * @returns {object} - Action: RECEIVED_CENTERS
 */
const fetchAllCenter = centersResponse => {
  const { centers, count } = centersResponse.data;
  return {
    type: RECEIVED_CENTERS,
    centers,
    count
  };
};

/**
 * Fetch all centers from backend
 *
 * @returns {void}
 */
const fetchAllCentersRequest = query => dispatch => {
  console.log(query);

  dispatch({
    type: FETCHING_CENTERS
  });
  axios
    .get(`${API_PATH}/centers`, { params: query })
    .then(response => {
      dispatch(fetchAllCenter(response.data));
    })
    .catch(error => dispatch({ type: FETCHING_CENTERS_ERROR }));
};

export default fetchAllCentersRequest;
