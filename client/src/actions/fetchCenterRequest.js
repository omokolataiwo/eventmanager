import instance from '../utils/axios';
import {
  FETCHING_CENTER,
  RECEIVED_CENTER,
  FETCHING_CENTER_ERROR,
  RECEIVED_ADMIN_CENTER
} from '../types';

/**
 * Action for when center is received
 *
 * @param {object} centerEvent - Center object from backend
 * @returns {object} - Action for fetched center state
 */
const recievedAdminCenter = centerEvent => {
  const { center, events, count } = centerEvent;
  return {
    type: RECEIVED_ADMIN_CENTER,
    center,
    events,
    count
  };
};

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
const userCenter = id => dispatch =>
  instance
    .get(`/centers/${id}`)
    .then(response => dispatch(recievedCenter(response.data.center)))
    .catch(error => {
      dispatch(fetchingCenterError(error.response.data));
    });

/**
 * Fetch admin center
 *
 * @param {*} value Query parameters
 * @param {object} query -
 * @return {void}
 */
const adminCenter = (value, query) => (dispatch, getState) => {
  instance.defaults.headers.common[
    'x-access-token'
  ] = getState().user.accessToken;
  return instance
    .get(`/centers/admin/center`, { params: { ...value, ...query } })
    .then(response => {
      dispatch(recievedAdminCenter(response.data));
    })
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
export const fetchCenterRequest = (value, query, admin) => dispatch => {
  dispatch(fetchingCenter());
  if (admin) return dispatch(adminCenter(value, query));
  return dispatch(userCenter(value));
};

export default fetchCenterRequest;
