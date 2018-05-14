import axios from 'axios';
import { API_PATH } from '../consts';
import { SEARCH_RESULT, SEARCHING_CENTER } from '../types';

/**
 * Action creator for searched result
 *
 * @param {object} centers Search result
 * @returns {object} Action [SEARCH_RESULT]
 */
const searchedResult = centers => ({
  type: SEARCH_RESULT,
  centers
});

/**
 * Search center
 *
 * @param {object} params Search parameters
 * @returns {void}
 */
const searchCenterRequest = params => dispatch => {
  dispatch({ type: SEARCHING_CENTER });
  axios
    .get(`${API_PATH}/centers/search`, { params })
    .then(response => {
      const { count } = response.data.centers[0];
      dispatch(searchedResult({ centers: response.data.centers, count }));
    })
    .catch(error => console.log(error));
};

export default searchCenterRequest;
