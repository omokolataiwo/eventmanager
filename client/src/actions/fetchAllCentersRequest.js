import instance from '../utils/axios';
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
  const { centers, count } = centersResponse;
  return {
    type: RECEIVED_CENTERS,
    centers,
    count
  };
};

/**
 * Fetch all centers from backend
 *
 * @param {object} query Page query
 * @returns {void}
 */
export const fetchAllCentersRequest = query => dispatch => {
  dispatch({
    type: FETCHING_CENTERS
  });
  return instance
    .get(`/centers`, { params: query })
    .then(response => {
      dispatch(fetchAllCenter(response.data));
    })
    .catch(error => dispatch({ type: FETCHING_CENTERS_ERROR }));
};

export default fetchAllCentersRequest;
