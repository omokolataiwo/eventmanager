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
      dispatch(searchedResult(response.data.centers));
    })
    .catch(error => console.log(error));
};

export default searchCenterRequest;
