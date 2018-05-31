import instance from '../utils/axios';
import {
  FETCHING_CENTERS_EVENTS,
  RECEIVED_CENTERS_EVENTS,
  FETCHING_CENTERS_EVENTS_ERRORS
} from '../types';

/**
 * Action for received events
 *
 * @param {object} events - events booked for admin centers
 * @return {object} Action: RECEIVED_CENTERS_EVENTS
 */
const recievedEvents = events => ({
  type: RECEIVED_CENTERS_EVENTS,
  events,
  count: events[0].count || 0
});

/**
 * Action for error events
 *
 * @param {object} error - events booked for admin centers
 * @return {object} Action: RECEIVED_CENTERS_EVENTS
 */
const fetchingCenterEventsError = error => ({
  type: FETCHING_CENTERS_EVENTS_ERRORS,
  error
});

/**
 * Actions creator for fetching admin events
 *
 * @returns {void}
 */
export const fetchCenterEventRequest = query => (dispatch, getState) => {
  dispatch({ type: FETCHING_CENTERS_EVENTS });
  instance.defaults.headers.common[
    'x-access-token'
  ] = getState().user.accessToken;
  return instance
    .get(`/centers/events`, { params: query })
    .then(response => {
      dispatch(recievedEvents(response.data.events));
    })
    .catch(error => {
      dispatch(fetchingCenterEventsError(error.response.errors));
    });
};
export default fetchCenterEventRequest;
