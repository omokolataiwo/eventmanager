import instance from '../utils/axios';

import {
  FETCHING_EVENTS,
  RECEIVED_EVENTS,
  FETCHING_EVENTS_ERROR
} from '../types';

/**
 * Action creator for dispatching fetching events initial state
 *
 * @returns {object} - Action: FETCHING_EVENTS
 */
const requestFetchUserEvent = () => ({ type: FETCHING_EVENTS });

/**
 * Action creator for dispatching received events from backend
 *
 * @param {events} response - User's events from backend
 * @returns {object} - Action: RECEIVED_EVENTS
 */
const userEvents = response => {
  const { events, count } = response;
  return {
    type: RECEIVED_EVENTS,
    events,
    count
  };
};

/**
 * Action creator for dispatching received events errors
 *
 * @param {object} error - Errors received
 * @returns {object}  - Action: FETCHING_EVENTS_ERROR
 */
const fetchUserEventError = error => ({ type: FETCHING_EVENTS_ERROR, error });

/**
 * Fetch user events from backend
 *
 * @returns {void}
 */
export const fetchUserEventsRequest = query => (dispatch, getState) => {
  dispatch(requestFetchUserEvent());
  instance.defaults.headers.common[
    'x-access-token'
  ] = getState().user.accessToken;
  dispatch(requestFetchUserEvent);
  return instance
    .get(`/events`, { params: query })
    .then(response => {
      dispatch(userEvents(response.data));
    })
    .catch(error => dispatch(fetchUserEventError(error.response.data.errors)));
};

export default fetchUserEventsRequest;
