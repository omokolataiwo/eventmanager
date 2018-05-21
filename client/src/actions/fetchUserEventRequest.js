import instance from '../utils/axios';
import { API_PATH } from '../consts';
import { FETCHING_EVENT, RECEIVED_EVENT, FETCHING_EVENT_ERROR } from '../types';

/**
 * Action creator for dispatching fetching events initial state
 *
 * @returns {object} - Action: FETCHING_EVENTS
 */
const requestFetchUserEvent = () => ({ type: FETCHING_EVENT });

/**
 * Action creator for dispatching received events from backend
 *
 * @param {events} response - User's events from backend
 * @returns {object} - Action: RECEIVED_EVENTS
 */
const userEvent = event => ({
  type: RECEIVED_EVENT,
  event
});

/**
 * Action creator for dispatching received events errors
 *
 * @param {object} error - Errors received
 * @returns {object}  - Action: FETCHING_EVENTS_ERROR
 */
const fetchUserEventError = error => ({ type: FETCHING_EVENT_ERROR, error });

/**
 * Fetch user event from backend
 *
 * @param {int} eventId EventId of event to be fetch
 * @returns {void}
 */
export const fetchUserEventRequest = eventId => (dispatch, getState) => {
  dispatch(requestFetchUserEvent());
  instance.defaults.headers.common[
    'x-access-token'
  ] = getState().user.accessToken;
  dispatch(requestFetchUserEvent);
  return instance
    .get(`/events/${eventId}`)
    .then(response => {
      dispatch(userEvent(response.data.event));
    })
    .catch(error =>
      dispatch(fetchUserEventError(error.response.data.errors[0])));
};

export default fetchUserEventRequest;
