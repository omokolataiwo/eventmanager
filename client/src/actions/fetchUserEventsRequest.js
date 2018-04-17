import axios from 'axios';
import { API_PATH } from '../consts';
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
 * @param {events} events - User's events from backend
 * @returns {object} - Action: RECEIVED_EVENTS
 */
const userEvents = events => ({ type: RECEIVED_EVENTS, events });

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
const fetchUserEventsRequest = () => (dispatch, getState) => {
  axios.defaults.headers.common['x-access-token'] = getState().user.accessToken;
  dispatch(requestFetchUserEvent);
  axios
    .get(`${API_PATH}/events`)
    .then(response => {
      dispatch(userEvents(response.data));
    })
    .catch(e => dispatch(fetchUserEventError(e)));
};

export default fetchUserEventsRequest;
