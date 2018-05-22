import instance from '../utils/axios';
import { SEARCH_RESULT, SEARCHING_CENTER, SEARCH_RESULT_ERROR } from '../types';

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
 * Action creator for center search error
 *
 * @param {object} errors Search errors
 * @returns {object} Action [SEARCH_RESULT_ERROR]
 */
const searchResultError = errors => ({
  type: SEARCH_RESULT_ERROR
});

/**
 * Search center
 *
 * @param {object} params Search parameters
 * @returns {void}
 */
export const searchCenterRequest = params => dispatch => {
  dispatch({ type: SEARCHING_CENTER });
  return instance
    .get(`/centers/search`, { params })
    .then(response => {
      const { count } = response.data.centers[0];
      dispatch(searchedResult({ centers: response.data.centers, count }));
    })
    .catch(error => dispatch(searchResultError(error.response.data.errors)));
};

export default searchCenterRequest;
